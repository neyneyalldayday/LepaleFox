const { User } = require('../models')

const withGuard = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

const apiGuard = async (req, res, next) => {
 if (!req.session.logged_in || !req.session.user_id) {
  return res.status(403).json({msg: 'You must log in to perform this action'})
 }

 try {
  const userData = await User.findByPk(req.session.user_id, {
    attributes: ['id', 'username', 'role']
  });

  if (!userData) {
    return res.status(403).json({msg: 'User not found'})
  }

  req.user = userData.get( { plain: true } );
  next();
 } catch (err) {
  console.error(err);
  res.status(500).json({msg: 'server error during authentication'})
  
 }
};

const withoutGuard = (req, res, next) => {
  if (!req.session.logged_in) {
    next();
  } else {
    res.redirect('/');
  }
};

const isAdmin = (req, res, next) => {
  if (req.user?.role === 'admin') {
    next();
  } else {
    console.log(req.user)
    res.status(403).json({ message: 'Access denied' });
  }
};

module.exports = { withGuard, apiGuard, withoutGuard, isAdmin };
