const fileModel = require('../models/fileModel');
const reportModel = require('../models/reportModel');
const utils = require('../utils/utils');

const isProd = process.env.NODE_ENV === 'production';

exports.getHomePage = async (req, res, next) => {
  try {
    const urlPath = req.url;
    const isLoggedIn = req.session.user ? true : false;
    return res.render('index', { isProd, urlPath, isLoggedIn });
  } catch (err) {
    next(err);
  }
};

exports.getLoginPage = async (req, res, next) => {
  try {
    const urlPath = req.url;
    const isLoggedIn = req.session.user ? true : false;
    return res.render('login', { isProd, urlPath, isLoggedIn });
  } catch (err) {
    next(err);
  }
};

exports.getRegisterPage = async (req, res, next) => {
  try {
    const urlPath = req.url;
    const isLoggedIn = req.session.user ? true : false;
    return res.render('register', { isProd, urlPath, isLoggedIn });
  } catch (err) {
    next(err);
  }
};

exports.getFilePage = async (req, res, next) => {
  try {
    const urlPath = req.url;
    const isLoggedIn = req.session.user ? true : false;

    const infoURL = req.params.fileID;
    if (infoURL) {
      const fileData = await fileModel.getFileInfoByURL(infoURL, next);
      if (fileData) {
        fileModel.increaseViews(infoURL, next);
        reportModel.addView(next);

        return res.render('filePage', {
          isProd,
          urlPath,
          isLoggedIn,
          fileData: {
            name: utils.splitName(fileData.name, 70),
            uploadDate: utils.parseDate(fileData.uploadDate),
            size: fileData.size,
            downloadURL: fileData.downloadURL,
            downloads: fileData.downloads
          },
          title: fileData.name
        });
      } else {
        next();
      }
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

exports.getDownloadPage = async (req, res, next) => {
  try {
    const urlPath = req.url;
    const isLoggedIn = req.session.user ? true : false;

    const downloadURL = req.params.fileID;
    if (downloadURL) {
      const fileData = await fileModel.getFileInfoByToken(downloadURL, next);
      if (fileData) {
        return res.render('downloadPage', {
          isProd,
          urlPath,
          isLoggedIn,
          fileData: {
            name: utils.splitName(fileData.name, 70),
            uploadDate: utils.parseDate(fileData.uploadDate),
            size: fileData.size,
            directDownloadURL: fileData.directDownloadURL,
            downloads: fileData.downloads,
            downloadURL
          },
          title: fileData.name
        });
      } else {
        next();
      }
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    req.session.destroy(function (err) {
      return res.redirect('/login');
    });
  } catch (err) {
    next(err);
  }
};

exports.getAdminPage = async (req, res, next) => {
  try {
    const urlPath = req.url;
    const isLoggedIn = req.session.user ? true : false;
    return res.render('admin', { isProd, urlPath, isLoggedIn });
  } catch (err) {
    next(err);
  }
};

exports.getAboutPage = async (req, res, next) => {
  try {
    const urlPath = req.url;
    const isLoggedIn = req.session.user ? true : false;
    return res.render('about', { isProd, urlPath, isLoggedIn });
  } catch (err) {
    next(err);
  }
};
