// server.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Используем простой объект для хранения данных
let usersData = {};

app.use(bodyParser.json());

// Сохранение данных
app.post('/save', (req, res) => {
    const { username, data } = req.body;
    usersData[username] = data;
    res.status(200).json({ success: true });
});

// Загрузка данных
app.get('/load/:username', (req, res) => {
    const { username } = req.params;
    const data = usersData[username] || { clickCount: 0, achievements: [] };
    res.json(data);
});

app.listen(PORT, () => {
    console.log('Сервер запущен на порту 3000');
});
