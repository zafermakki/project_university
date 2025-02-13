import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Center,
  Heading,
  Flex,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';

const ItemComponent = ({ item }) => {
  return (
    <Box width="50%" padding={4}>
    <Box rounded="lg" overflow="hidden" boxShadow="md">
      <img
        // src={`http://192.168.1.94:8000/media/${item.image_path}`}
        src={`http://127.0.0.1:8000/media/${item.image_path}`}
        alt="image"
        objectFit="cover"
        height="400px"
        width="400px"
        style={{boxShadow:"5px 5px 30px 1px #2196f3", marginLeft:"170px", marginTop:"30px",borderRadius:"20px"}}
      />
      <Box p={4}>
        {/* <Text color="amber.500" fontSize="16px" fontWeight="bold" sx={{textAlign:"center"}}>
          {item.name}
        </Text>
        <Text color="amber.500" fontSize="16px" fontWeight="bold" sx={{textAlign:"center"}}>
          {item.price} $
        </Text> */}
        <Text color="amber.500" fontSize="16px" fontWeight="bold" sx={{textAlign:"center",marginTop:"10px"}}>
          Quantity: {item.quantity} {/* Display quantity here */}
        </Text>
      </Box>
    </Box>
  </Box>
  );
};

const Purchases = () => {
  const [news, setNews] = useState([]);
  const location = useLocation();
  const customer_id = location.state?.user_id; // Retrieve user_id from state

  useEffect(() => {
    if (customer_id) {
      getData();
    }
  }, [customer_id]);

  const getData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        // `http://192.168.1.94:8000/api/sales/${customer_id}/`
        `http://127.0.0.1:8000/api/cart/purchases/${customer_id}/`,{
          headers: {
            Authorization: `Token ${token}`
          }
        }
      );
      console.log(response.data); 
      setNews(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
      <Box>
        <Center backgroundColor={"amber.500"}>
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1,textAlign: 'center',fontSize: '40px' }}>
                Purchases
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      </Center>
          <Flex
            flexWrap="wrap"
            justifyContent="space-between"
            p={4}
            width="100%"
            boxSizing="border-box"
          >
            {news.map((item) => (
              <ItemComponent key={item.id} item={item} />
            ))}
          </Flex>
    </Box>
  );
};

export default Purchases;


