import React, { useState, useRef } from 'react';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { Grid, TextField, Button, Typography, useMediaQuery, Box } from '@mui/material';
import Swal from "sweetalert2"
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import "./verifyemail.css";

const VerifyEmail = () => {
    const location = useLocation();
    const [code, setCode] = useState(new Array(6).fill(''));
    const email = location.state?.email;
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const inputRefs = useRef([]);
    const navigate = useNavigate();

    const handleChange = (index, value) => {
        if (value.length <= 1) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && code[index] === '') {
            if (index > 0) {
                inputRefs.current[index - 1].focus();
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const verificationCode = code.join('');

        try {
            const response = await fetch('http://127.0.0.1:8000/api/auth/resend-verifycodeview/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, code: verificationCode }),  // استخدم البريد الإلكتروني الصحيح هنا
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(data.message);
                setError('');
                navigate('/login'); // إعادة التوجيه إلى صفحة تسجيل الدخول بعد النجاح
                Swal.fire({
                    position: "bottom-end",
                    icon: "success",
                    title: "your account has been created",
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
            setError('حدث خطأ أثناء التحقق من الرمز.');
        }
    };

    const handleResendVerification = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/auth/resend-verification/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }), // نرسل البريد الإلكتروني فقط لإعادة إرسال الرمز
            });
    
            const data = await response.json();
    
            if (response.ok) {
                setSuccess(data.message);
                setError('');
            } else {
                setError(data.message);
                setSuccess('');
            }
        } catch (err) {
            console.error(err);
            setError('حدث خطأ أثناء إعادة إرسال رمز التحقق.');
        }
    };
    

    return (
        <div className="get-start-container-code">
            <div className="content-code">
                <div>
                    <h2>VERIFY EMAIL</h2>
                    <FlightTakeoffIcon sx={{ width: "80px", height: "80px" }} />
                    <p style={{ fontSize: "15px" }}>Enter the code that was sent to your email</p>
                </div>
                <div>
                    <Grid container justifyContent="center" spacing={2} style={{ marginTop: '20px' }}>
                        {code.map((value, index) => (
                            <Grid item key={index}>
                                <TextField
                                    inputProps={{
                                        maxLength: 1,
                                        style: {
                                            textAlign: 'center',
                                            fontSize: '24px',
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '5px',
                                            border: '1px solid #121C17'
                                        }
                                    }}
                                    value={code[index]}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    inputRef={(el) => (inputRefs.current[index] = el)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                    <Button
                        variant="contained"
                        sx={{ marginTop: '20px', backgroundColor: '#7b1fa2', color: '#fff' }}
                        onClick={handleSubmit}
                    >
                        Verify Code
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{ marginTop: '20px', color: '#7b1fa2', borderColor: '#7b1fa2',marginLeft:"10px" }}
                        onClick={handleResendVerification}
                    >
                        Resend Code
                    </Button>
                    {error && <Box sx={{ color: 'red', marginTop: '10px' }}>{error}</Box>}
                    {success && <Box sx={{ color: 'green', marginTop: '10px' }}>{success}</Box>}
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;
