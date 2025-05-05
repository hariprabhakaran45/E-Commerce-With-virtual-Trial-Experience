import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faDollarSign, faPercentage, faTags } from '@fortawesome/free-solid-svg-icons';

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: '',
    image: '',
    category: 'women',
    new_price: '',
    old_price: '',
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({
      ...productDetails,
      [e.target.name]: e.target.value,
    });
  };

  const Add_Product = async () => {
    console.log(productDetails);
    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append('product', image);

    try {
      const uploadResponse = await fetch('http://localhost:4000/upload', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });

      responseData = await uploadResponse.json();

      if (responseData.success) {
        product.image = responseData.image_url;

        const addProductResponse = await fetch('http://localhost:4000/addproduct', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product),
        });

        const addProductData = await addProductResponse.json();

        if (addProductData.success) {
          alert('Product Added');
          window.location.reload(); 
        } else {
          alert('Failed to Add Product');
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="add-product">
      {/* Header Section */}
      <div className="add-product-header">
        <h1>
          <FontAwesomeIcon icon={faBox} className="header-icon" /> Add A New Product
        </h1>
        <p>Fill in the details below to add a new product to the catalog.</p>
      </div>

      {/* Form Section */}
      <div className="addproduct-itemfield">
        <p>
          <FontAwesomeIcon icon={faTags} className="field-icon" /> Product Title
        </p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Enter product name"
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>
            <FontAwesomeIcon icon={faDollarSign} className="field-icon" /> Price
          </p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="text"
            name="old_price"
            placeholder="Enter original price"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>
            <FontAwesomeIcon icon={faPercentage} className="field-icon" /> Offer Price
          </p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="text"
            name="new_price"
            placeholder="Enter offer price"
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className="add-product-selector"
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            className="addproduct-thumbnail-img"
            alt="Upload Thumbnail"
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
      <button onClick={Add_Product} className="addproduct-btn">
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
