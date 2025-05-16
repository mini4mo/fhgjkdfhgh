const express = require('express');
const db = require('../config/db');

const router = express.Router();

// Создать заказ
router.post('/create', async (req, res) => {
  const { userId, items } = req.body; // items - массив {menuItemId, quantity}
  if (!userId || !items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'Неверные данные заказа' });
  }
  try {
    // Создаем заказ
    const [result] = await db.execute('INSERT INTO orders (user_id, status) VALUES (?, ?)', [userId, 'Создан']);
    const orderId = result.insertId;

    // Добавляем позиции заказа
    const orderItemsPromises = items.map(item => {
      return db.execute(
        'INSERT INTO order_items (order_id, menu_item_id, quantity) VALUES (?, ?, ?)',
        [orderId, item.menuItemId, item.quantity]
      );
    });
    await Promise.all(orderItemsPromises);

    res.status(201).json({ message: 'Заказ создан', orderId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Получить статус заказа
router.get('/status/:orderId', async (req, res) => {
  const { orderId } = req.params;
  try {
    const [orders] = await db.execute('SELECT status FROM orders WHERE id = ?', [orderId]);
    if (orders.length === 0) {
      return res.status(404).json({ message: 'Заказ не найден' });
    }
    res.json({ status: orders[0].status });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

module.exports = router;
