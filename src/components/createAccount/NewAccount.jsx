import React, { useState } from 'react';
import { Button, Box, TextField  } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import "./newacount.css";

const NewAccount = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password || !formData.email) {
      setError('جميع الحقول مطلوبة');
      setSuccess('');
      return;
    }

    if (formData.password.length < 8) {
      setError('يجب ان تكون كلمة المرور 8 محارف او أكثر');
      setSuccess('');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/client/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        setError('');
        navigate('/verify-email',{ state: { email: formData.email}});
        Swal.fire({
          position: "bottom-end",
          icon: "success",
          title: "A confirmation code has been sent to your email address",
          showConfirmButton: false,
          timer: 4500,
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
      } else {
        setError(data.message);
        setSuccess('');
      }
    } catch (err) {
      console.error(err);
      setError('حدث خطأ أثناء إنشاء الحساب.');
    }
  };

  return (
    <div className="backImg">
      <div className="background-animation">
        <div className="shape shape1"></div>
        <div className="shape shape2"></div>
        <div className="shape shape3"></div>
      </div>
      <div className="contentnewaccount">
        <div>
          <h2 className='text-createAccount'>Create Account</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='input-createAccount'>
            <TextField
              label="Username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              sx={{ margin: "15px", width: "400px" }}
            />
            <br />
            <TextField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              sx={{ margin: "15px", width: "400px" }}
            />
            <br />
            <TextField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              sx={{ margin: "15px", width: "400px" }}
            />
            <br />
            <Button
              variant='contained'
              sx={{ backgroundColor: "#7b1fa2", color: "#fff" }}
              className='btn-create-account'
              type="submit"
            >
              Create Account
            </Button>
          </div>
          {error && <Box sx={{ color: 'red', marginTop: '10px',textAlign:"center" }}>{error}</Box>}
          {success && <Box sx={{ color: 'green', marginTop: '10px',textAlign:"center" }}>{success}</Box>}
        </form>
      </div>
    </div>
  );
}

export default NewAccount;
