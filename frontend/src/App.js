import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import OrderStatus from './pages/OrderStatus';

function App() {
  const [token, setToken] = React.useState(localStorage.getItem('token') || null);

  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/menu" element={token ? <Menu token={token} /> : <Navigate to="/login" />} />
        <Route path="/cart" element={token ? <Cart token={token} /> : <Navigate to="/login" />} />
        <Route path="/order-status/:orderId" element={token ? <OrderStatus token={token} /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={token ? "/menu" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
