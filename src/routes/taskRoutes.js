const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {
  getTasks, getTaskById, createTask, updateTask, deleteTask
} = require('../controllers/taskController');

router.get('/', auth, getTasks);
router.post('/', auth, createTask);
router.get('/:id', auth, getTaskById);
router.put('/:id', auth, updateTask);
router.delete('/:id', auth, deleteTask);

module.exports = router;
