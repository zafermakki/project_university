import React,{useState} from 'react'
import { Modal, Box, Typography, TextField, Button} from "@mui/material"
import axios from 'axios';

const PasswordResetModal = ({open, onClose, onVerificationOpen }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handlePasswordSubmit = async () => {
        try{
            const response = await axios.post('http://127.0.0.1:8000/api/auth/password-reset/',{
                email,
                new_password: password,
            });
            localStorage.setItem('email',email);
            setSuccessMessage(response.data.message);
            setError(null);
            onClose();
            onVerificationOpen();
        } catch (err) {
            setError(err.response?.data?.message || 'An error occured.');
            setSuccessMessage('');
        }
    };

  return (
    <Modal open={open} onClose={onClose}>
        <Box 
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                backgroundColor:"#30003f",
                boxShadow: 24,
                p: 4,
              }}
        >
            <Typography variant="h6" component="h2">
                Reset Password
            </Typography>
            {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
            {successMessage && <Typography color="success" sx={{ mt: 2 }}>{successMessage}</Typography>}    
                <TextField
                    label="Email"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                    label="New Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
            />
            <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2,backgroundColor:"#7b1fa2",color:"#fff" }}
                    onClick={handlePasswordSubmit}
            >
                 Submit
            </Button>
        </Box>
    </Modal>
  )
}

export default PasswordResetModal