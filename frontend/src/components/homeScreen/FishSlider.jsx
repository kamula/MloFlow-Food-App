/* eslint-disable react/prop-types */
import  {useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {Typography, Button,  Box} from '@mui/material';
import { CartContext } from "../../context/Cart"; 
import styled from "styled-components";
import WishlistBtn from "./WishlistBtn";
import axios from "axios";
import './styles.css';


const NextArrowButton = styled.button`
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
  background-color: #fbb31d;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index:2;

  &:hover {
    background-color: #d5b542; /* Darker shade on hover */
  }
`;

const PrevArrowButton = styled.button`
  position: absolute;
  top: 50%;
  left: 5px;
  transform: translateY(-50%);
  background-color: #fbb31d; /* Yellow-green background color */
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 2;

  &:hover {
    background-color: #d5b542; /* Darker shade on hover */
  }
`;

const NextArrowIcon = styled(ChevronRightIcon)`
  width: 20px;
  height: 20px;
  fill: #0C0B0B;
`;

const PrevArrowIcon = styled(ChevronLeftIcon)`
  width: 20px;
  height: 20px;
  fill: #0C0B0B;
`;


const SampleNextArrow = ({ onClick }) => {
  return (
    <NextArrowButton onClick={onClick}>
    <NextArrowIcon />
  </NextArrowButton>
);
};
  

const SamplePrevArrow = ({ onClick }) => {
  return (
    <PrevArrowButton onClick={onClick}>
      <PrevArrowIcon />
    </PrevArrowButton>
  );
};


const SlidingWrapper = styled.div`
display: inline;
flex-wrap: nowrap;
justify-content: center; /* Change to flex-start to fill the row space */
height: 100px;
max-width: 1000px;
overflow-x: auto;
padding: 0px;
`;

const SliderItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-radius: 10px;

  transition: transform 0.3s ease;
  &:hover {
    transform: scale(0.95);
    box-shadow: 0px 0px 5px 3px #FBB31D;
  }

  @media (max-width: 768px) {
    width:80vh;
  }

`;

const SliderImage = styled.img`
flex: 1;
width: 97%;
height: 150px;
object-fit: cover;
margin-bottom:1.5rem;
border-radius: 10px 10px 10px 10px;
`;


const FishSlider = () => {
  const   {addToCart}  = useContext(CartContext);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true, // Add this line
    autoplaySpeed: 3000,
    nextArrow: <SampleNextArrow onClick={() => {}} />,
    prevArrow: <SamplePrevArrow onClick={() => {}} />,
  };
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
    <SlidingWrapper>
      <Slider {...settings}>
        {products.map((product) => {
            if (product.category === "Fish") {
          return (
            <SliderItem key={product.id}>  
            <Link  to={`/products/${product.id}`} >
              <SliderImage src={product.imageOne} alt={product.name} />
              </Link>
              <Typography sx={{ fontWeight: 600, color: '#0275d8', fontSize: '1.5rem', }} >{product.name}</Typography>
              <Box className="price-wish">
              <Typography component="p">{`KES ${product.price}`}</Typography>
              <WishlistBtn
              initialLiked={false}
              onToggleLike={() => {
                // Handle like toggle logic here
              }}
              amount={product.price}
            />
              </Box>
              <Button variant="contained" className="add" onClick={() => {
                addToCart(product);
              }}>ADD TO CART</Button>
            </SliderItem>
          )}
        })}
      </Slider>
    </SlidingWrapper>
  );
};

export default FishSlider;
