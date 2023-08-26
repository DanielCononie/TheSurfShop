import React, { useState } from 'react';
import axios from 'axios';
import {Link } from 'react-router-dom'

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('');
  const [brand, setBrand] = useState('');
  const [productImage, setProductImage] = useState(null);

  const createNewProduct = async () => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('type', type);
      formData.append('brand', brand);
      formData.append('productImage', productImage); // Assuming productImage is a File object from the file input
  
      await axios.post('http://localhost:3003/AddProduct', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

        // Clear the form values
        setName('');
        setDescription('');
        setPrice('');
        setType('');
        setBrand('');
        setProductImage(null);
  
      // Rest of the code
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };
  
  return (
    <div className='AddProduct'>
      <Link to='/AdminDashboard' className='back-dashboard'>Back to dashboard</Link>
      <h2>Add New Product</h2>
      <form className='product-form'>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

        <label>Price:</label>
        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />

        <label>Type:</label>
        <input type="text" value={type} onChange={(e) => setType(e.target.value)} />

        <label>Brand:</label>
        <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />

        <label>Product Image:</label>
        <input type="file" className='file-input' onChange={(e) => setProductImage(e.target.files[0])} />

        <button type="button" onClick={createNewProduct}>Submit</button>
      </form>
    </div>
  );
};

export default AddProduct;