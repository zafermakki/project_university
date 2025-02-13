import React, {useState} from 'react';
import { Button,TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; 
import LoginIcon from '@mui/icons-material/Login';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../redux/cartSlice';
import PasswordResetModal from '../modal/PasswordResetModal';
import VerificationModal from '../modal/VerificationModal';
import axios from 'axios';
import "./login.css"

const Login = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [openVerificationModal, setOpenVerificationModal] = useState(false);


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/client/login/', {
        email,
        password
      });
      console.log(response.data);
      localStorage.setItem('token', response.data.token);
      setTimeout(() => {
        const storedUserId = localStorage.setItem('user_id', response.data.user_id);
        console.log(storedUserId); // تحقق من القيمة بعد وقت قصير
      }, 1000);
      dispatch(cartActions.clearItems())
      navigate('/list');
    } catch (err) {
      setError(err.response?.data?.error || 'An error occured');
    }
  };

  const handlePasswordReset = () => {
    setOpenPasswordModal(true)
  }


  return (
    <>
    
      <div className="get-start-container">
          <div className="background-animation">
            
              <div className="shape shape1"></div>
              <div className="shape shape2"></div>
              <div className="shape shape3"></div>
          </div>
          <div className="content">
              <div>
                <h2 className='text-login'>Login</h2>
              </div>
              <form onSubmit={handleLogin}>
          <div>
            <div className='input-login'>
              <TextField
                label="Email"
                type="text"
                className='input-user'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ margin: "15px" }}
              />
              <br />
              <TextField
                label="Password"
                type="password"
                className='input-password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ margin: "15px" }}
              />
              <br />
              <Button 
                variant='contained'
                className='btn-login'
                type='submit'
                sx={{
                  backgroundColor: "#7b1fa2",
                  color: "#fff"
                }}
              >
                Login <LoginIcon />
              </Button>
              <p style={{ fontSize: "20px" }}> if you forget your password<br/> you can recover the account<br/>
                  <span style={{color:"blue",textDecoration:"underline",cursor:"pointer"}}
                    onClick={handlePasswordReset}
                  >
                    forget password
                  </span>
              </p>
              <Button 
                variant='contained'
                className='btn-create-account1'
                sx={{
                  backgroundColor: "#7b1fa2",
                  color: "#fff"
                }}
                onClick={() => navigate('/createaccount')}
              >
                Create Account
              </Button>
            </div>
          </div>
          </form>
          {error && <p style={{color: 'red'}}>{error}</p>}
          </div>
    </div>
    <PasswordResetModal
         open={openPasswordModal}
         onClose={() => setOpenPasswordModal(false)}
         onVerificationOpen={() => setOpenVerificationModal(true)}
      />
      <VerificationModal
        open={openVerificationModal}
        onClose={() => setOpenVerificationModal(false)}
      />
    </>
  );
}

export default Login