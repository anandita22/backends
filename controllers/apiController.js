const userModel = require('../models/userModel');
const fileModel = require('../models/fileModel');
const reportModel = require('../models/reportModel');
const utils = require('../utils/utils');

exports.signup = async (req, res, next) => {
  try {
    const details = req.body;
    const isExist = await userModel.getUser(details.email, next);

    if (isExist) {
      return res.json({
        success: false,
        msg: 'This email is already registered with us!'
      });
    } else {
      details.password = await utils.hashPassword(details.password, next);
      const user = await userModel.createUser(details);
      return res.json({ success: true, msg: 'Signup successfully!', user });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.signin = async (req, res, next) => {
  try {
    const details = req.body;
    const user = await userModel.getUser(details.email, next);

    if (user) {
      const isValid = await utils.verifyPassword(
        details.password,
        user.password
      );

      if (isValid === true) {
        req.session.user = user;

        console.log('Logged user!', req.session.user);

        return res.json({ success: true, msg: 'Login success!' });
      } else {
        return res.json({ success: false, msg: 'Incorrect password!' });
      }
    } else {
      return res.json({ success: false, msg: 'Account not found!' });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.addFiles = async (req, res, next) => {
  try {
    const file = req.body;

    const fileObj = {
      name: file.fileName,
      uploadDate: Date.now(),
      size: file.fileSize,
      infoURL: utils.shortid(),
      downloadURL: utils.uuid(),
      directDownloadURL: file.downloadURL
    };

    const fileData = await fileModel.saveFile(fileObj, next);

    return res.json({
      success: true,
      msg: 'File added!',
      file: {
        URL: `/file/${fileData.infoURL}`
      }
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getFiles = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = 15;
    const files = await fileModel.getFiles(page * limit, limit, next);
    return res.json({ success: true, files });
  } catch (err) {
    console.log(err);
  }
};

exports.increaseDownloads = async (req, res, next) => {
  try {
    const downloadURL = req.body.downloadURL;

    if (downloadURL) {
      await fileModel.increaseDownloads(downloadURL, next);
      await reportModel.addDownload(next);
      return res.json({ success: true, msg: 'Download increased!' });
    } else {
      return res.json({ success: false, msg: 'File not found!' });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.increaseAds = async (req, res, next) => {
  try {
    const downloadURL = req.body.downloadURL;

    if (downloadURL) {
      await fileModel.increaseAds(downloadURL, next);
      await reportModel.addAdv(next);
      return res.json({ success: true, msg: 'Ads increased!' });
    } else {
      return res.json({ success: false, msg: 'File not found!' });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getFileDetails = async (req, res, next) => {
  try {
    const fileId = req.params.id;
    if (!fileId) return res.json({ success: false, data: null });
    const file = await fileModel.getFileDetails(fileId, next);
    if (file) {
      return res.json({ success: true, data: file });
    } else {
      return res.json({ success: false, data: null });
    }
  } catch (err) {
    console.log(err);
    return res.json({ success: false, data: null });
  }
};

exports.updateFile = async (req, res, next) => {
  try {
    const fileId = req.params.id;
    if (!fileId) return res.json({ success: false, data: null });
    if (req.body.fileName && req.body.fileSize && req.body.downloadURL) {
      const data = {
        name: req.body.fileName,
        size: req.body.fileSize,
        directDownloadURL: req.body.downloadURL
      };

      const file = await fileModel.updateFile(fileId, data, next);
      if (file) {
        return res.json({ success: true, msg: 'File updated!' });
      } else {
        return res.json({ success: false, msg: 'Unable to update file' });
      }
    } else {
      return res.json({ success: false, mgs: 'Params missing' });
    }
  } catch (err) {
    console.log(err);
    return res.json({ success: false, msg: 'Something went wrong' });
  }
};

exports.updateDomain = async (req, res, next) => {
  try {
    const domain = req.params.domain;
    console.log('Domain >> ', domain);
    if (domain) {
      const result = await fileModel.updateDomain(domain, next);
      if (result) {
        return res.json({ success: true, msg: 'Domain updated!' });
      } else {
        return res.json({ success: true, msg: 'Unable to update domain' });
      }
    } else {
      return res.json({ success: false, msg: 'Domain not found' });
    }
  } catch (err) {
    console.log(err);
    return res.json({ success: false, msg: 'Something went wrong' });
  }
};
