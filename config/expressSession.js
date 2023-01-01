const sessionConfig = {
  httpOnly: true,
  path: '/',
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 1000 * 1000
  }
};

module.exports = sessionConfig;
