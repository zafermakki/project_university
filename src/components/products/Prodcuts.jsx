import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Center, Heading } from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import { AppBar, Toolbar, Typography, TextField, InputAdornment } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import {useNavigate} from "react-router-dom"

let debounceTimer;

const Prodcuts = () => {
  const { subcategory_id } = useParams();
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // لإدارة نص البحث
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path); // التوجيه إلى الصفحة المحددة
  };

  useEffect(() => {
    getData(); // تحميل البيانات عند الدخول إلى الصفحة
  }, [subcategory_id]);

  useEffect(() => {
    // البحث التلقائي عند تحديث نص البحث
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      if (searchQuery.trim()) {
        handleSearch();
      } else {
        getData(); // إذا كان الحقل فارغًا، يتم تحميل البيانات الأصلية
      }
    }, 300); // التأخير لمدة 300 مللي ثانية
    return () => clearTimeout(debounceTimer); // تنظيف المؤقت عند إلغاء التحديث
  }, [searchQuery]);

  const getData = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/products/subcategories/prodcuts/${subcategory_id}/`
      );
      setNews(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/products/search/${subcategory_id}/?q=${searchQuery}`
      );
      setNews(response.data);
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
          <Box
      sx={{
        display: 'flex',
        justifyContent: 'center', // محاذاة المحتوى إلى المنتصف أفقياً
        alignItems: 'center',    // محاذاة المحتوى إلى المنتصف عمودياً
        gap: 70,                  // المسافة بين العناصر
        padding: 2,              // حواف داخلية لإضافة مساحة حول المحتوى
      }}
    >
      {['Home', 'Profile', 'List'].map((text, index) => (
        <Typography
          key={index}
          variant="body1"
          sx={{
            fontSize: '18px',
            fontWeight: '600',
            cursor: 'pointer',
            position: 'relative', // لتفعيل التأثير تحت النص
            '&:hover::after': {
              content: '""', // إضافة عنصر وهمي تحت النص
              position: 'absolute',
              bottom: -2, // المسافة بين النص والخط
              left: 0,
              width: '100%', // عندما نمرر الماوس، نعرض الخط بالكامل
              height: '2px',
              backgroundColor: '#2196f3',
              transition: 'width 0.3s ease-in-out', // جعل تأثير الحركة يستغرق 0.5 ثانية عند المرور
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -2, // المسافة بين النص والخط
              left: 0,
              width: 0, // يبدأ العرض صفرًا عند عدم وجود المؤشر
              height: '2px',
              backgroundColor: '#2196f3',
              transition: 'width 0.3s ease-in-out', // تأخير 0.5 ثانية لإخفاء الخط بعد إزالة المؤشر
            },
          }}
          onClick={() => {
            handleNavigation(text === 'Home' ? '/' : `/${text.toLowerCase()}`);
          }}       
        >
          {text}
        </Typography>
      ))}
    </Box>  



            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, textAlign: "center", fontSize: "40px" }}
            >
              The Products
            </Typography>
            <TextField
              placeholder="Search for products..."
              variant="outlined"
              size="small"
              sx={{ backgroundColor: "#000", borderRadius: "5px", ml: 2, border:"2px solid #2196f3" }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // تحديث نص البحث مباشرة
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" >
                    <SearchIcon sx={{
                      color:"#2196f3",
                    backgroundColor:"#000"

                    }}/>
                  </InputAdornment>
                ),
                sx: {
                  input: {
                    color: "#2196f3",
                    backgroundColor:"#000"
                  },
                },
              }}
            />
          </Toolbar>
        </AppBar>
      </Box>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
        {news.map((item) => (
          <div key={item.id} style={{ margin: "20px" }}>
            <Link to={`/details`} state={{ item }} style={{ textDecoration: "none" }}>
              <div>
                <img
                  src={`http://127.0.0.1:8000${item.image_path}`}
                  alt="image"
                  style={{
                    width: "600px",
                    height: "400px",
                    borderRadius: "10px",
                    boxShadow: "5px 5px 30px 1px #2196f3",
                  }}
                />
                <p style={{ textAlign: "center", marginTop: "10px", color: "#2196f3" }}>
                  {item.name}
                </p>
                <p style={{ textAlign: "center", color: "#2196f3" }}>{item.price} $ </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Prodcuts;
