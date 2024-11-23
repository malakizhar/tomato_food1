import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItem = {}, food_list = [], removeFromCart, getTotalCartAmount } = useContext(StoreContext);
  const url = "http://localhost:4000"; // Base URL for images
  const navigate = useNavigate(); // For navigation

  return (
    <div className="cart">
      {/* Cart items section */}
      <div className="cart-items">
        {food_list.length === 0 ? ( // Check if food_list is empty
          <p>Your cart is empty</p>
        ) : (
          <>
            <div className="cart-items-title">
              <p>Item</p>
              <p>Title</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
            </div>
            <hr />
            <br />

            {/* Iterate over food_list and display items in the cart */}
            {food_list.map((item, index) => {
              const itemQuantity = cartItem[item._id] || 0; // Use 0 if item is not in cart
              
              // Only display items with a quantity greater than 0
              if (itemQuantity > 0) {
                return (
                  <div key={index} className="cart-items-title cart-items-item">
                    <img src={`${url}/images/${item.image}`} alt={item.name} />
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <p>{itemQuantity}</p>
                    <p>${(item.price * itemQuantity).toFixed(2)}</p>
                    <p onClick={() => removeFromCart(item._id)} className="cross">
                      X
                    </p>
                  </div>
                );
              }
              return null; // Don't render items with 0 quantity
            })}
          </>
        )}
      </div>

      {/* Cart bottom section */}
      <div className="cart-bottom">
        {/* Cart totals */}
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount().toFixed(2)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${(getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2).toFixed(2)}</b>
            </div>

            <button onClick={() => navigate("/order")}>PROCEED TO CHECKOUT</button>
          </div>
        </div>

        {/* Promo code section */}
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here..</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
