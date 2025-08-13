const Task = require('../models/Task');

// GET /tasks?status=done&priority=high&page=1&limit=10&sort=createdAt:desc
exports.getTasks = async (req, res) => {
  const { page = 1, limit = 10, status, priority, sort } = req.query;
  const query = {};
  if (status) query.status = status;
  if (priority) query.priority = priority;

  const sortObj = {};
  if (sort) {
    const [key, order] = sort.split(':');
    sortObj[key] = order === 'desc' ? -1 : 1;
  } else {
    sortObj.createdAt = -1;
  }

  const skip = (Number(page) - 1) * Number(limit);
  try {
    const [total, tasks] = await Promise.all([
      Task.countDocuments(query),
      Task.find(query)
        .populate('assignedTo', 'name email')
        .sort(sortObj)
        .skip(skip)
        .limit(Number(limit))
    ]);
    res.json({
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
      tasks
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('assignedTo', 'name email');
    if (!task) return res.status(404).json({ message: 'Tâche non trouvée' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ message: 'Tâche non trouvée' });
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Tâche non trouvée' });
    res.json({ message: 'Supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
