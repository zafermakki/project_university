import React, {useState} from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; 
import LoginIcon from '@mui/icons-material/Login';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../redux/cartSlice';
import "./login.css"

const Login = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [user, setUser] = useState({
    username:'',
    password: ''
  });

  const checkUser = async () => {
    let url = 'http://127.0.0.1:8000/api/customers/check-user/';
    let options = {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json'
      },
      body : JSON.stringify(user)
    };

    let response = await fetch(url , options);
    if (response.ok) {
      let data = await response.json();
      localStorage.setItem('user_id', data.id);
      localStorage.setItem('user_name', data.username)
      dispatch(cartActions.clearItems())
      navigate('/list');
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "check your username and password",
        customClass: {
          container: 'custom-swal-container',
          popup: 'custom-swal-popup',
          header: 'custom-swal-header',
          title: 'custom-swal-title',
          content: 'custom-swal-content',
          actions: 'custom-swal-actions',
          confirmButton: 'custom-swal-confirm-button',
        }
      });
    }
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
              <div>
                <div className='input-login'>
                    <input
                        type="text"
                        placeholder='username'
                        className='input-user'
                        value={user.username}
                        onChange={(e) => 
                          setUser({ ... user, username: e.target.value})
                        }
                    />
                    <br/>
                    <input
                      type="password"
                      placeholder='password'
                      className='input-password'
                      value={user.password}
                      onChange={(e) => 
                        setUser({ ...user, password: e.target.value})
                      }
                    />
                    <br/>
                    <Button variant='contained'className='btn-login' onClick={checkUser}>
                        Login <LoginIcon/>
                    </Button>
                    <p style={{fontSize:"20px"}}>
                        If you don't have an account<br />
                        click the button in bottom
                    </p>
                    <Button variant='contained'className='btn-create-account1'
                      onClick={() => 
                        navigate('/newaccount')
                      }
                    >
                      Create Account
                    </Button>
                </div>
              </div>
          </div>
    </div>
    </>
  );
}

export default Login