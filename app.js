require("dotenv").config();

const express = require('express'); 
const helmet = require("helmet");
const cors = require("cors"); 
const rateLimit = require("express-rate-limit");
const errorHandler = require('./src/middlewares/errorHandler');

const authRoutes = require('./src/routes/authRoutes');
const taskRoutes = require('./src/routes/taskRoutes');
const userRoutes = require('./src/routes/userRoutes');

const app = express();

// Sécurité et middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
});
app.use(limiter);

// Gestion des routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

// Middleware gestion erreurs globales personnalisé
app.use(errorHandler);

// Middleware d’erreur fallback (au cas où errorHandler ne capture pas)
app.use((err, req, res, next) => {
    console.error(err.stack);  // correction typo stack
    res.status(500).json({ message: "Erreur de Serveur" });
});

module.exports = app;
