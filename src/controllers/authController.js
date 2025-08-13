const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email déjà utilisé' });

    await User.create({ name, email, password });
    res.status(201).json({ message: 'Utilisateur créé avec succès, veuillez vous connecter.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Email ou mot de passe invalide' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Email ou mot de passe invalide' });

    const token = signToken(user);
    res.json({
      user: { id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




exports.protect = async (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.startsWith('Bearer') ? req.headers.authorization.split(' ')[1] : null;
  
  if (!token) return res.status(401).json({ message: 'Vous devez être connecté pour accéder à cette ressource' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token invalide ou expiré' });
  }
};
exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  res.status(403).json({ message: 'Accès refusé, vous n\'êtes pas autorisé à effectuer cette action' });
};
exports.isAuthenticated = (req, res, next) => {
  if (req.user) {
    return next();
  }
  res.status(401).json({ message: 'Vous devez être connecté pour accéder à cette ressource' });
};

exports.logout = (req, res) => {
  res.status(200).json({ message: 'Déconnexion réussie' });
}
exports.getCurrentUser = (req, res) => {
  res.status(200).json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    }
  });
}
