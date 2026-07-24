const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db');

const authRoutes = require('./routes/auth');
const savesRoutes = require('./routes/saves');
const freeActionRoutes = require('./routes/freeAction');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*' // Agora aponta para a porta 4200 do Angular
}));
app.use(express.json());

// Initialize Database
db.initDb();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/saves', savesRoutes);
app.use('/api/free-action', freeActionRoutes);

// Health check endpoint for Render
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
