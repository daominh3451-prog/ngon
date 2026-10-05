import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import { Navbar } from './ProductList';

const CartItem = ({ onNavigate }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const itemTotal = (item) => item.cost * item.quantity;
  const totalAmount = () => items.reduce((sum, item) => sum + itemTotal(item), 0);

  const handleIncrement = (item) =>
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  return (
    <div>
      <Navbar onNavigate={onNavigate} />
      <div className="cart-page">
        <h2>Shopping Cart</h2>
        <p className="total">Total Cart Amount: ${totalAmount()}</p>
        {items.length === 0 && <p>Your cart is empty. Add some plants!</p>}
        {items.map((item) => (
          <div className="cart-item" key={item.name}>
            <img src={item.image} alt={item.name} />
            <div className="info">
              <h3>{item.name}</h3>
              <p>Unit price: ${item.cost}</p>
              <div className="qty-controls">
                <button className="qty-btn" onClick={() => handleDecrement(item)}>-</button>
                <span>{item.quantity}</span>
                <button className="qty-btn" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <p>Total: ${itemTotal(item)}</p>
            </div>
            <button className="delete-btn" onClick={() => dispatch(removeItem(item.name))}>Delete</button>
          </div>
        ))}
        <div className="cart-actions">
          <button className="continue-btn" onClick={() => onNavigate('plants')}>Continue Shopping</button>
          <button className="checkout-btn" onClick={() => alert('Coming Soon')}>Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
