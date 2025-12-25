// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Инициализация
const app = express();
const PORT = process.env.PORT || 3000;

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/clicker', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Модель пользователя
const userSchema = new mongoose.Schema({
  username: String,
  clickCount: Number,
  achievements: [Object],
  date: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Настройка парсера
app.use(bodyParser.json());

// API для сохранения данных
app.post('/save', async (req, res) => {
  try {
    const { username, clickCount, achievements } = req.body;
    
    // Ищем пользователя
    let user = await User.findOne({ username });
    
    if (!user) {
      user = new User({ username, clickCount, achievements });
    } else {
      user.clickCount = clickCount;
      user.achievements = achievements;
    }
    
    await user.save();
    res.status(200).json({ message: 'Данные сохранены' });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка сохранения' });
  }
});

// API для загрузки данных
app.get('/load/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    
    if (user) {
      res.json({
        clickCount: user.clickCount,
        achievements: user.achievements
      });
    } else {
      res.json({ clickCount: 0, achievements: [] });
    }
  } catch (error) {
    res.status(500).json({ error: 'Ошибка загрузки' });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
