import React, { useState } from 'react';
import { Button, Box, Typography  } from '@mui/material';
import { UploadFile } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import "./newacount.css";

const NewAccount = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    email: '',
  });

  const [profileImage, setProfileImage] = useState(null);

  const handleFileChange = (event) => {
    setProfileImage(event.target.files[0]);
  }; // إضافة حالة للصورة

  const addUser = async () => {
    if (user.password.length < 8) {
      Swal.fire({
        icon: "error",
        title: "Password too short",
        text: "Password must be at least 8 characters long",
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
      return;
    }

    // إنشاء FormData لإرسال البيانات
    const formData = new FormData();
    formData.append('first_name', user.first_name);
    formData.append('last_name', user.last_name);
    formData.append('username', user.username);
    formData.append('password', user.password);
    formData.append('email', user.email);
    if (profileImage) {
      formData.append('profile_image', profileImage); // إضافة الصورة
    }

    let url = 'http://127.0.0.1:8000/api/customers/add-user/';
    let options = {
      method: 'POST',
      body: formData,
    };

    let response = await fetch(url, options);
    if (response.status === 201) {
      Swal.fire({
        position: "bottom-end",
        icon: "success",
        title: "Your account has been created",
        showConfirmButton: false,
        timer: 2500,
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
      navigate('/login');
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Username/Email already exists",
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
        <form>
          <div className='input-createAccount'>
            <input 
              type="text"
              name="username"
              placeholder='username'
              className='input-user'
              onChange={(e) => {
                setUser({ ...user, username: e.target.value })
              }}
            />
            <br />
            <input 
              type="password"
              name="password"
              placeholder='password'
              className='input'
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <br />
            <input 
              type="email"
              name="email"
              placeholder='email'
              className='input'
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <br />
            <input 
              type="text"
              name="first_name"
              placeholder='first name'
              className='input'
              value={user.first_name}
              onChange={(e) => setUser({ ...user, first_name: e.target.value })}
            />
            <br />
            <input 
              type="text"
              name="last_name"
              placeholder='last name'
              className='input'
              value={user.last_name}
              onChange={(e) => setUser({ ...user, last_name: e.target.value })}
            />
            <br />
            <Box textAlign="center" mt={0} mb={2}>
                <input
                  accept="image/*"
                  style={{ display: 'none' }} // إخفاء الإدخال الافتراضي
                  id="file-upload"
                  type="file"
                  onChange={handleFileChange}
                />
                <label htmlFor="file-upload">
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    startIcon={<UploadFile />}
                  >
                    choose image 
                  </Button>
                </label>
                {profileImage && (
                  <Typography variant="body2" mt={2} sx={{maxWidth:"435px"}}>
                      the file has been selected: {profileImage.name}
                  </Typography>
                )}
            </Box>
            <Button variant='contained' className='btn-create-account'
              onClick={addUser}
            >
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewAccount;
