import React, {useState} from 'react';
import axios from "axios";
import { Button, Card, CardMedia, CardContent, Typography, Grid, CircularProgress, Box } from "@mui/material"
import WifiIcon from '@mui/icons-material/Wifi';
import WifiOffIcon from '@mui/icons-material/WifiOff';

const AstroRobot = () => {

  const [products, setProdcuts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const token = localStorage.getItem('token');

  const fetchProducts = async (category) => {
    setLoading(true);
    let url = "";

    if (category === "top") {
      url = "http://127.0.0.1:8000/api/products/top-rated/";
    } else if (category === "medium") {
      url = "http://127.0.0.1:8000/api/products/medium-rated/"
    } else if (category === "low") {
      url = "http://127.0.0.1:8000/api/products/low-rated/";
    } else if (category === "purchased") {
      url = "http://127.0.0.1:8000/api/cart/top_products/";
    } else if (category === "offline") {
      url = "http://127.0.0.1:8000/api/products/offline_games/";
    } else if (category === "online") {
      url = "http://127.0.0.1:8000/api/products/online_games/";
    } else if (category === "discounted") {
      url = "http://127.0.0.1:8000/api/products/discounted/";
    }

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Token ${token}`
        }
      });
      setProdcuts(response.data);
      setHasSearched(true);
    } catch (error) {
      console.log("Error fetching products:", error);
      setHasSearched(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ textAlign: "center", padding: 3 }}>

    {/* الأزرار لاختيار نوع التقييم */}
    <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
      <Button variant="contained" color="primary" onClick={() => fetchProducts("top")}>
        🔝 Top Rate
      </Button>
      <Button variant="contained" color="warning" onClick={() => fetchProducts("medium")}>
        ⭐ Medium Rate
      </Button>
      <Button variant="contained" color="error" onClick={() => fetchProducts("low")}>
        ⚠️ Low Rate
      </Button>
      <Button variant="contained" color="success" onClick={() => fetchProducts("purchased")}>
        🛒 Top Purchased
      </Button>
      <Button variant="contained" color="info" onClick={() => fetchProducts("offline")}>
        <WifiOffIcon sx={{marginRight:"4px"}}/> Offline Games
      </Button>
      <Button variant="contained" color="secondary" onClick={() => fetchProducts("online")}>
        <WifiIcon sx={{marginRight:"4px"}}/> Online Games
      </Button>
      <Button variant="contained" color="success" onClick={() => fetchProducts("discounted")}>
        🏷️ Discounted
      </Button>
    </Box>

    {/* عرض مؤشر التحميل */}
    {loading && <CircularProgress sx={{ my: 3 }} />}

    {/* عرض المنتجات */}
    <Grid container spacing={3} justifyContent="flex-start">
      {products.length > 0 ? (
        products.map((product, index) => (
          <Grid item key={product.id || index} xs={12} sm={6} md={3}>
            <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
              <CardMedia
                component="img"
                height="200"
                image={`http://127.0.0.1:8000${product.image_path || '/media/' + product.product__image_path}`}
                alt={product.name || product.product__name}
              />
              <CardContent>
                <Typography variant="h6">
                  {product.name || product.product__name}
                </Typography>
                {product.average_rating && (
                  <Typography variant="body2" color="text.secondary">
                    ⭐ Evaluation: {product.average_rating}
                  </Typography>
                )}
                {product.price && (
                  <Typography variant="body1" color="primary">
                    💰 Price: {product.discount_percentage > 0 ? (
                                  <>
                                    <span style={{ textDecoration: 'line-through', marginRight: '8px', color: 'red' }}>
                                      {`${product.price} $`}
                                    </span>
                                    <span>
                                      {`${(product.price - ((product.discount_percentage / 100) * product.price)).toFixed(2)} $`}
                                    </span>
                                  </>
                                ) : (
                                  `${product.price} $`
                                )}
                  </Typography>
                )}
                {product.total_quantity && (
                  <Typography variant="body1" color="secondary">
                    🛒 Purchases: {product.total_quantity}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        !loading && hasSearched && (
          <Typography variant="body1" color="error">
            Products have not been found.
          </Typography>
        )
      )}
    </Grid>
  </Box>
  )
}

export default AstroRobot