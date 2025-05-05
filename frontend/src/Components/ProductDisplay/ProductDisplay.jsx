import React, { useContext, useState } from 'react';
import './ProductDisplay.css';
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from '../../Context/ShopContext';
import { useNavigate } from 'react-router-dom';

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  const [showPopup, setShowPopup] = useState(false); 
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem('auth-token'); // Check if the user is logged in

  const handleAddToCart = (id) => {
    addToCart(id);
    setShowPopup(true); 

    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  const handleTryVirtually = (id) => {
    if (isLoggedIn) {
      navigate(`/virtualtry/${id}`);
    } else {
      alert('Please log in to access this feature.');
    }
  };

  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="productdisplay-img">
          <img className='productdisplay-main-img' src={product.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">RS {product.old_price}</div>
          <div className="productdisplay-right-price-new">RS {product.new_price}</div>
        </div>
        <div className="productdisplay-right-description">
          For casual wear.
        </div>

        <button onClick={() => handleTryVirtually(product.id)}>Try-Virtually</button>

        <button onClick={() => handleAddToCart(product.id)}>ADD TO CART</button>
      </div>

      {showPopup && (
        <div className="popup show">
          <p>Product added to cart!</p>
        </div>
      )}
    </div>
  );
};

export default ProductDisplay;
