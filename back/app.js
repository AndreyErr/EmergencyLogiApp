require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const db = require('./pgdb');

const PORT = process.env.PORT || 4000;

const http = require('http').Server(app);

const router = require('./router/index');
const errorMiddleware = require('./exceptions/errorMiddleware');

app.use(express.json());
app.use(cors());

// Middleware для добавления задержки
const delayMiddleware = async (req, res, next) => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // задержка 2 секунды
  next();
};

// Используем middleware для задержки на каждый запрос
app.use(delayMiddleware);

app.use('/api', router);
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.post('/', (req, res) => {
  res.send('Hello World!');
});

app.use(errorMiddleware);

const start = async () => {
  try {
    http.listen(PORT, () => console.log(`Сервер работает на порту ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
