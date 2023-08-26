import React from 'react';
import './App.css'
import Axios from 'axios';
import { useState, useEffect } from 'react';
import { Buffer } from 'buffer';

function Product() {

    // Used to hold all products
    const [product, setProduct] = useState([])
    // Used to hold the selected category
    const [selectedCategory, setSelectedCategory] = useState("All");
    // Used to filter out the products based on the category
    const [filteredProducts, setFilteredProducts] = useState([]);
    // Used to hold the products that the user selects to add to cart
    const [cartItems, setCartItems] = useState([]);
    // Used to display the cart information if the button is clicked
    const [showCart, setShowCart] = useState(false);
    const [total, setTotal] = useState(0);
    const [showProducts, setShowProducts] = useState(true);

    const [showCheckout, setShowCheckout] = useState(false)


    // Grabbing all product data
    useEffect(() => {
        Axios.get("http://localhost:3003/Product")
          .then((response) => {
            console.log('Response from the server:', response.data); // Add this log
            setProduct(response.data);
          })
          .catch((error) => {
            console.error('Error fetching data:', error); // Add this log
          });
      }, []);


      // Setting the selected category when a button is clicked
      // If all is selected, then the selected category is product
      useEffect(() => {
        if (selectedCategory === "All") {
          setFilteredProducts(product);
        } else {
          setFilteredProducts(product.filter((p) => p.type === selectedCategory));
        }
      }, [selectedCategory, product]);


      // When a cart item is added, add the price to the total
      useEffect(() => {
        let sum = 0;

        cartItems.forEach(element => {
            sum += element.price;
        });
        setTotal(sum)

      }, [cartItems])


      // Adding an item to the cart while keeping the previous
      function addToCart(item) {
        setCartItems((prevItems) => [...prevItems, item]);
      }

      function clearCart() {
        setTotal(0)
        setCartItems([])
      }

      function handleCheckoutClick() {
        setShowCheckout((prevShowCheckout) => !prevShowCheckout);
      }

      function handleSubmitClick() {
        setCartItems([])
        setShowCart(prev => !prev);
      }


    return(

        <div className='Product-component'>
            {showProducts && 
            <span className='cart-span'>
                <h1>Products</h1>
                {!showCart && (
                <button onClick={() => {
                    setShowCart(true)
                    setShowCheckout(false)
                }}>
                    View Cart </button>
                )} 
                <label>({cartItems.length}) items</label>
            </span>
            } 

            {!showCart && ( 
                <span className='product-categories'>
                    <button onClick={() => setSelectedCategory("All")}>All</button>
                    <button onClick={() => setSelectedCategory("Skate")}>Skate</button>
                    <button onClick={() => setSelectedCategory("Surf")}>Surf</button>
                    <button onClick={() => setSelectedCategory("Apparel")}>Apparel</button>
                    <button onClick={() => setSelectedCategory("Other")}>Other</button>
                </span>
            )}

            {/* If the cart is set as false, render the filtered products */}
            {!showCart ? ( 
            <div className='product-container'>   
            {filteredProducts.map((p) => {
                return (
                    <div key={p._id} className='product'>
                        {/* Before rendering the image, check to see if it exists so no error is thrown */}
                        {p.productImage && p.productImage.data && p.productImage.contentType && (
                            <img
                            src={`data:${p.productImage.contentType};base64,${Buffer.from(p.productImage.data).toString('base64')}`}
                            alt="Product Display"
                            className='product-img'
                            />
                        )}
                        <div className='under-img'>
                            <p><strong>{p.name} ${p.price}</strong></p>
                            <p><strong>Description: </strong>{p.description} </p>
                            {/* <p><strong>Type: </strong>{p.type} </p> */}
                            <p><strong>Brand: </strong>{p.brand} </p>
                            <button onClick={() => addToCart(p)}>Add to cart</button>
                        </div>
                    </div>
                        
                );
            })}
            </div>
            
            // Else if the cart is set as true, render the cart html
            ) : ( 
            <div className='cart-container'>
                <h2>Shopping Cart</h2>
                <hr style={{width: '100%'}}/>
                {/* If the cart items is empty, render the cart is empty */}
                {cartItems.length === 0 ? (
                  <p>Cart is empty</p>
                // If the cart has items , render the items
                ) : (
                <div>
                  <ul className='cart-list'>
                    {cartItems.map((item, index) => (
                      <li key={index}>
                        <img
                            src={`data:${item.productImage.contentType};base64,${Buffer.from(item.productImage.data).toString('base64')}`}
                            alt="Product Display"
                            className='cart-img'
                            />
                         <label className='cart-label'> {item.name} - ${item.price} </label>
                      </li>
                    ))}
                  </ul>
                  <p>Subtotal: ${total.toFixed(2)}</p>
                  <p>Tax: ${(total * 0.075).toFixed(2)}</p>
                  <p>Total: ${(total + (total * 0.075)).toFixed(2)}</p>
                  <button className='cart-btns' onClick={() => setShowCart(false)}>Back to products</button>
                  <button className='cart-btns' onClick={clearCart}>Clear Cart</button>
                  <button className='cart-btns' onClick={handleCheckoutClick}>Checkout</button>
                  {showCheckout && (
                    <div className='checkout-form'>
                        <h2>Checkout Form</h2>
                        <label>Name</label>
                        <input />
                        <label>Address</label>
                        <input />
                        <label>Card #</label>
                        <input />
                        <button onClick={handleSubmitClick}>Submit</button>
                        <button onClick={() => {
                          setShowProducts(true)
                          setShowCart(false)
                        }}>Cancel</button>
                    </div>
                  )}
                </div>

                )}
                
              </div>
            )}
      
            
        </div>
    )
}

export default Product;