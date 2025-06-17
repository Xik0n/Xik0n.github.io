const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Путь к файлу данных
const DATA_PATH = path.join(__dirname, 'products.json');

// Функции для работы с данными
function readData() {
    return JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
}

function writeData(data) {
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
}

// API Endpoints (оставить как в предыдущем примере)
// ... [ваши API эндпоинты из предыдущего кода] ...

// Обслуживание статических файлов
app.use(express.static(__dirname));

// Специальный роут для админ-панели
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Роут для главной страницы
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
    console.log(`Админ-панель: http://localhost:${PORT}/admin`);
    console.log(`Главная страница: http://localhost:${PORT}`);
});
