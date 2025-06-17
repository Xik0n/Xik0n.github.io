const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(__dirname)); // Обслуживаем текущую директорию

// Путь к файлу данных
const DATA_PATH = path.join(__dirname, 'products.json');

// Функции для работы с данными
function readData() {
    return JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
}

function writeData(data) {
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
}

// API Endpoints

// Получить все данные
app.get('/api/products', (req, res) => {
    try {
        const data = readData();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка чтения данных' });
    }
});

// Сохранить все данные
app.post('/api/save', (req, res) => {
    try {
        const newData = req.body;
        writeData(newData);
        res.json({ message: 'Данные успешно сохранены', data: newData });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка сохранения данных' });
    }
});

// Остальные API обработчики (изменение категории, товара и т.д.)
// ... (ваши существующие эндпоинты) ...

// Обслуживание админ-панели
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
    console.log(`Админ-панель: http://localhost:${PORT}/admin`);
});
