const isProd = process.env.NODE_ENV === 'production';

exports.get404ErrorPage = async (req, res, next) => {
  try {
    const urlPath = req.url;
    const isLoggedIn = req.session.user ? true : false;
    return res.status(200).render('404', { urlPath, isProd, isLoggedIn });
  } catch (err) {
    next(err);
  }
};

exports.get500ErrorPage = async (err, req, res, next) => {
  try {
    console.log(err);
    const urlPath = req.url;
    const isLoggedIn = req.session.user ? true : false;
    return res.status(200).render('500', { urlPath, isProd, isLoggedIn });
  } catch (err) {}
};
