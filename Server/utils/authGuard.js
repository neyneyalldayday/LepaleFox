const withGuard = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

const apiGuard = (req, res, next) => {
  if (!req.session.logged_in) {
    res.status(403).json({ msg: 'you must login to perform this action' });
  } else {
    next();
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
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied' });
  }
};

module.exports = { withGuard, apiGuard, withoutGuard, isAdmin };
