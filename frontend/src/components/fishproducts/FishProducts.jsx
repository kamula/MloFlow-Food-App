import  {useContext, useState, useEffect} from 'react';
import { Box, Button, Card, CardActions, CardActionArea, CardContent, CardMedia, Grid,  Typography } from '@mui/material';
import axios from 'axios';
import { CartContext } from '../../context/Cart'; 
import WishlistButton from '../homeScreen/WishlistBtn';
import "./styles.css";
import { Link } from 'react-router-dom';

const FishProducts = () => {

const {addToCart}  = useContext(CartContext);
 
    const [products, setProducts] = useState([])

    const getProducts = async () => {
    const response = await axios.get('http://localhost:8000/products/')
      setProducts(response.data)
      console.log(response.data)
    }

    useEffect(() =>{
      getProducts();
    }, [])
    
  return (
      <Box sx={{ m: 4 }} >
        <Typography variant="h3" sx={{mt:4, mb:2, textAlign:'center'}}>Fish </Typography>
        {/* #FBB31D, #0C0B0B */}
          <Grid container spacing={1} >
          {products.map((product) => {
            if (product.category === "Fish") {
              return  (
            <Grid sx={{ display: 'flex', width:'sm', mr:'auto', ml:'auto', mt:3}}  key={product.id}>
              <Card className='custom-card'
                sx={{ height: 'auto',  }}
              >
                  
                <Link  to={`/products/${product.id}`} >
                  <CardActionArea>
                     <CardMedia
                            component="img"
                            image={product.imageOne}
                            alt={product.name}
                          />
                          
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h3" >
                    {product.name}
                  </Typography>
               </CardContent>
                  <Typography gutterBottom variant="h5" component="h4" >
                    View 
                  </Typography>
                  </CardActionArea>
                  </Link>
                  <CardActions>
                  <Typography component='h4' sx={{mr:6, fontWeight:700}}> KES {product.price}</Typography>
              <WishlistButton 
              initialLiked={false}
              onToggleLike={() => {
                // Handle like toggle logic here
              }}
              amount={product.price} 
            />
                  </CardActions>
                  <Button variant='contained' sx={{backgroundColor:'#FBB31D', color:'#0C0B0B',fontWeight:800, width:'100%'}}
               onClick={() => addToCart(product)}>
                ADD TO CART
            </Button> 
              </Card>
            </Grid>)
          }}
          )
          } 
        </Grid>
      </Box>
  );
}
export default FishProducts;

