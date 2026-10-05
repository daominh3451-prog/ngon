import React, { useState } from 'react';
import ProductList from './ProductList';
import CartItem from './CartItem';
import AboutUs from './AboutUs';

function App() {
  const [view, setView] = useState('home'); // 'home' | 'plants' | 'cart'

  if (view === 'plants') return <ProductList onNavigate={setView} />;
  if (view === 'cart') return <CartItem onNavigate={setView} />;

  return (
    <div className="landing-page">
      <div className="landing-content">
        <div className="hero">
          <h1>Paradise Nursery</h1>
          <p>Where green meets serenity</p>
          <button className="get-started-button" onClick={() => setView('plants')}>
            Get Started
          </button>
        </div>
        <AboutUs />
      </div>
    </div>
  );
}

export default App;
