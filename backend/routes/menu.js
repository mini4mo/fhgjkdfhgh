const express = require('express');
const db = require('../config/db');

const router = express.Router();

// Получить меню
router.get('/', async (req, res) => {
  try {
    const [menuItems] = await db.execute('SELECT * FROM menu_items');
    res.json(menuItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

module.exports = router;
