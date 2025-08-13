const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const authorize = require('../middlewares/authorize');
const {
  getTasks, getTaskById, createTask, updateTask, deleteTask
} = require('../controllers/taskController');

// Tous les utilisateurs authentifiés peuvent voir et créer des tâches
router.get('/', auth, getTasks);
router.post('/', auth, createTask);

// Seul admin ou propriétaire peut voir, modifier ou supprimer une tâche
router.get('/:id', auth, getTaskById);
router.put('/:id', auth, updateTask);
router.delete('/:id', auth, deleteTask);

module.exports = router;
