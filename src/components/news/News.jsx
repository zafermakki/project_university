import React, {useEffect, useState} from 'react';
import axios from "axios";
import { Container, Grid, Card, CardMedia, CardContent, Typography, CircularProgress, Alert } from '@mui/material';
import astrosleep from "../../images/astrosleep.png";
import astronews from "../../images/astronews.png";

const News = () => {

    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/news/", {
            headers: {
                Authorization: `Token ${token}`
            }
        })
        .then((response) => {
            setNews(response.data);
            setLoading(false);
        })
        .catch((error) => {
            setError("error");
            setLoading(false);
        });
    }, [token]);

    if (loading) return (
        <Container sx={{ textAlign: 'center', marginTop: 4 }}>
            <CircularProgress />
        </Container>
    );
    if (error) return (
        <Container sx={{ textAlign: 'center', marginTop: 4 }}>
            <Alert severity="error">{error}</Alert>
        </Container>
    );

    if (news.length === 0) {
        return (
          <Container
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '80vh'
            }}
          >
            <img src={astrosleep} alt="No News" style={{ maxWidth: '100%', height: 'auto' }} />
          </Container>
        );
      }

  return (
    <Container sx={{ marginTop: 4 }}>
            <Typography variant="h4" component="h2" gutterBottom>
                <img src={astronews} style={{width:"100px"}}/>
                 News 
            </Typography>
            <Grid container spacing={3}>
                {news.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                        <Card>
                            {item.image && (
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={`http://127.0.0.1:8000${item.image}`}
                                    alt={item.name}
                                />
                            )}
                            <CardContent>
                                <Typography variant="h6" component="h3" gutterBottom>
                                    {item.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.explanation}
                                </Typography>
                                <Typography variant="caption" display="block" sx={{ marginTop: 1 }}>
                                    {new Date(item.created_at).toLocaleDateString()}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
  )
}

export default News