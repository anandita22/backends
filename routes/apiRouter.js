const express = require('express');
const router = express.Router();

const apiController = require('../controllers/apiController');

const sessionCheck = require('../utils/sessionCheck');

router.post('/signin', apiController.signin);

router.post('/signup', apiController.signup);

router.post('/add-files', sessionCheck.isAdmin, apiController.addFiles);

router.get('/files', sessionCheck.isAdmin, apiController.getFiles);

router.get('/file/:id', sessionCheck.isAdmin, apiController.getFileDetails);

router.post('/file/:id', sessionCheck.isAdmin, apiController.updateFile);

router.post(
  '/increase-downloads',
  sessionCheck.isAdmin,
  apiController.increaseDownloads
);

router.post('/increase-ads', sessionCheck.isAdmin, apiController.increaseAds);

// router.get('/update-domain/:domain', apiController.updateDomain);

module.exports = router;
