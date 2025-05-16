import React, { useEffect, useState } from 'react';
import { getMenu } from '../api';
import { useNavigate } from 'react-router-dom';

function Menu({ token }) {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMenu()
      .then(response => setMenuItems(response.data))
      .catch(error => console.error('Ошибка загрузки меню', error));
  }, []);

  const addToCart = (item) => {
    setCart(prevCart => {
      const existing = prevCart.find(i => i.id === item.id);
      if (existing) {
        return prevCart.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const goToCart = () => {
    navigate('/cart', { state: { cart } });
  };

  return (
    <div className="container">
      <h2>Меню</h2>
      <ul>
        {menuItems.map(item => (
          <li key={item.id}>
            <h3>{item.name} - {item.price} ₽</h3>
            <p>{item.description}</p>
            <button onClick={() => addToCart(item)}>Добавить в корзину</button>
          </li>
        ))}
      </ul>
      {cart.length > 0 && (
        <button className="cart-button" onClick={goToCart}>Перейти в корзину ({cart.reduce((acc, i) => acc + i.quantity, 0)})</button>
      )}
    </div>
  );
}

export default Menu;
