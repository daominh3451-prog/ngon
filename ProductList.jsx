import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

const img = (text, color) =>
  `https://placehold.co/300x200/${color}/ffffff?text=${encodeURIComponent(text)}`;

const make = (names, color, start) =>
  names.map((name, i) => ({ name, image: img(name, color), cost: start + i * 2 }));

const plantsArray = [
  { category: 'Air Purifying Plants', plants: make(['Snake Plant', 'Spider Plant', 'Peace Lily', 'Boston Fern', 'Rubber Plant', 'Aloe Vera'], '2e7d4f', 12) },
  { category: 'Aromatic Plants', plants: make(['Lavender', 'Jasmine', 'Rosemary', 'Mint', 'Lemon Balm', 'Basil'], '6a1b9a', 10) },
  { category: 'Succulents', plants: make(['Jade Plant', 'Echeveria', 'Haworthia', 'Burro\'s Tail', 'Zebra Cactus', 'Panda Plant'], 'ef6c00', 8) },
];

export const Navbar = ({ onNavigate }) => {
  const totalItems = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  return (
    <nav className="navbar">
      <span className="brand">Paradise Nursery</span>
      <div className="links">
        <a onClick={() => onNavigate('home')}>Home</a>
        <a onClick={() => onNavigate('plants')}>Plants</a>
        <a onClick={() => onNavigate('cart')}>Cart</a>
        <a className="cart-icon" onClick={() => onNavigate('cart')} aria-label="Shopping cart">
          🛒<span className="cart-count">{totalItems}</span>
        </a>
      </div>
    </nav>
  );
};

const ProductList = ({ onNavigate }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const inCart = (name) => cartItems.some((item) => item.name === name);

  return (
    <div>
      <Navbar onNavigate={onNavigate} />
      <div className="product-list">
        {plantsArray.map((group) => (
          <section className="category" key={group.category}>
            <h2>{group.category}</h2>
            <div className="product-grid">
              {group.plants.map((plant) => (
                <div className="product-card" key={plant.name}>
                  <img src={plant.image} alt={plant.name} />
                  <h3>{plant.name}</h3>
                  <p className="price">${plant.cost}</p>
                  <button
                    className="add-btn"
                    disabled={inCart(plant.name)}
                    onClick={() => dispatch(addItem(plant))}
                  >
                    {inCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
