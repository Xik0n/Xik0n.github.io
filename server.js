const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Путь к данным
const DATA_PATH = path.join(__dirname, 'public', 'products.json');

// API обработчики (из предыдущего ответа)
// ... 

// Обслуживание админ-панели
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
    console.log(`Админ-панель: http://localhost:${PORT}/admin`);
});