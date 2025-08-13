const User = require('../models/User');

// Récupérer tous les utilisateurs (avec pagination)
const getPagination = require('../utils/pagination');

exports.getUsers = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const total = await User.countDocuments();

    const users = await User.find()
      .skip(skip)
      .limit(limit)
      .select('-password')
      .lean();

    res.json({
      page,
      totalPages: Math.ceil(total / limit),
      totalUsers: total,
      users,
    });
  } catch (err) {
    next(err);
  }
};


// Récupérer un utilisateur par ID
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password').lean();
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// Modifier un utilisateur
exports.updateUser = async (req, res, next) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password').lean();
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// Supprimer un utilisateur
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.json({ message: 'Utilisateur supprimé' });
  } catch (err) {
    next(err);
  }
};
