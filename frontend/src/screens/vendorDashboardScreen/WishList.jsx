import { useContext } from 'react';
import { Button, Container, Divider } from '@mui/material';
import { RemoveCircleOutlineOutlined } from '@mui/icons-material';
import { ArrowLeftSharp } from '@mui/icons-material';
import './styles.css';
import { Link } from 'react-router-dom';
import { FavoriteContext } from '../../context/WishList';

export default function WishList() {
  const { 
    favoriteItems,
    addToFavorites,
    removeFromFavorites,
    clearFavorites } = useContext(FavoriteContext)

  return (
    <Container maxWidth="md" className='cart'>
      <div className='shopping'>
    <h1 className="cart-tittle">Your Wish List </h1>
    <button className="empty-cart"
                onClick={clearFavorites}
              >
                Empty List
              </button>
        </div>
    <Divider />
      <table className="cart-container">
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Descriptiion</th>
            <th>Price (KES)</th>
            <th>Add to Cart</th>
            <th>Remove </th>
          </tr>
        </thead>
    {favoriteItems?.map((item) => (
        <tbody key={item.id}>
          <tr>
            <td>   
                  <h4 className="text-lg font-bold">{item.name}</h4>
                    </td>
                    <td>
                      <img src={item.imageOne} alt={item.name} width={60} className="cart-item-image" />
                      </td>
            <td>               
               <div className="quantity-control">
                <p>{item.description}</p>
                </div>
                </td>
            <td>
            <p className="price">{item.price}</p>
            </td>
                <td>
                    <RemoveCircleOutlineOutlined  onClick={() => removeFromFavorites(item)}/>
                </td>
                <td></td>
          </tr>
        </tbody>
        
        ))}
        </table>
        <div className="cart-footer">
        {favoriteItems.length > 0 ? (
            <h4 className="cart-total">{(favoriteItems?.length)}</h4>
            ) : (
              <h1 className="cart-empty">Your Wish List is empty</h1>
              )}
              </div>
              <div>
                <Link to={'/products'}>
                <Button><ArrowLeftSharp />  Continue Shopping</Button>
                </Link>
                <Link to={'/cart'}>
                <Button variant='contained' sx={{ float:'right'}}>Proceed to Shopping Cart</Button>
                </Link>
              </div>
    </Container>
  );
}

