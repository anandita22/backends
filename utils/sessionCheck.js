exports.isLoggedIn = async (req, res, next) => {
  if (req.session && req.session.user) {
    return res.redirect('/admin');
  } else {
    next();
  }
};

exports.isAdmin = async (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    return res.redirect('/login');
  }
};
