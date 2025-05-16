import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createOrder } from '../api';

function Cart({ token }) {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = location.state?.cart || [];

  const userId = 1; // Для демонстрации, в реальном приложении нужно получить из токена или контекста

  const handleOrder = async () => {
    if (cart.length === 0) return;
    const items = cart.map(item => ({
      menuItemId: item.id,
      quantity: item.quantity,
    }));
    try {
      const response = await createOrder(token, userId, items);
      const orderId = response.data.orderId;
      navigate(`/order-status/${orderId}`);
    } catch (error) {
      alert('Ошибка при создании заказа');
    }
  };

  return (
    <div className="container">
      <h2>Корзина</h2>
      {cart.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <ul>
          {cart.map(item => (
            <li key={item.id}>
              {item.name} x {item.quantity} = {item.price * item.quantity} ₽
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleOrder} disabled={cart.length === 0}>
        Заказать
      </button>
    </div>
  );
}

export default Cart;
