require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routers/authRouter');
const delegatesRouter = require('./routers/delegatesRouter');
const cors = require('cors');

const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;
const ORIGIN_URL = process.env.CORS_ORIGIN_URL;

const app = express();

app.use(cors({ origin: `${ORIGIN_URL}` }));
app.use(express.json());

app.use('/auth', authRouter);
app.use('/delegates', delegatesRouter);

const start = async () => {
  try {
    await mongoose.connect(`${DB_URI}`);
    app.listen(PORT, () => console.log('Server started'));

  } catch (e) {
    console.error(e);
  }
}

start().catch(() => console.error('Server error'));
module.exports = app;
