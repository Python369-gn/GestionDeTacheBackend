const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const User = require('../models/User');

// Liste des membres (Protégé)
router.get('/', auth, async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

// Modifier rôle ou info (seulement admin idéalement)
router.put('/:id', auth, async (req, res) => {
  // ici tu peux vérifier req.user.role === 'admin' si besoin
  const { name, role } = req.body;
  const user = await User.findByIdAndUpdate(req.params.id, { name, role }, { new: true }).select('-password');
  if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
  res.json(user);
});

module.exports = router;

