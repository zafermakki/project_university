import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import axios from "axios"; // للتعامل مع API

const ReservationModal = ({ open, handleClose, flightId, userEmail }) => {
  const [formData, setFormData] = useState({
    passport_name: "",
    seats_booked: "",
    travel_class: "economy", // Default to economy
    credit_card_name: "",
    credit_card_number: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    // إعداد البيانات للإرسال
    const bookingData = {
      flight: flightId, // تعبئة تلقائية للرحلة
      email: userEmail, // البريد الإلكتروني المسجل (مرسل من المكون الأب)
      ...formData,
    };

    try {
        const token = localStorage.getItem('token');
      const response = await axios.post(
        "http://127.0.0.1:8000/api/booking/create/", // استبدل بالـ endpoint المناسب
        bookingData,
        {
            headers: {
              Authorization: `Token ${token}`, // Include token in Authorization header
            },
        }
      );
      console.log("Booking Successful:", response.data);
      alert("Reservation successful! Check your email for details.");
      handleClose(); // إغلاق النافذة
      setFormData('');
    } catch (error) {
      console.error("Booking Failed:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Failed to make a reservation.");
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" mb={2}>
          Complete Your Reservation
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Passport Name"
              name="passport_name"
              value={formData.passport_name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Seats Booked"
              name="seats_booked"
              type="number"
              value={formData.seats_booked}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              select
              SelectProps={{ native: true }}
              label="Travel Class"
              name="travel_class"
              value={formData.travel_class}
              onChange={handleInputChange}
            >
              <option value="economy">Economy</option>
              <option value="business">Business</option>
              <option value="first_class">First Class</option>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Credit Card Name"
              name="credit_card_name"
              value={formData.credit_card_name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Credit Card Number"
              name="credit_card_number"
              type="text"
              value={formData.credit_card_number}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          Reserve
        </Button>
      </Box>
    </Modal>
  );
};

export default ReservationModal;
