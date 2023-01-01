const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');
const sessionCheck = require('../utils/sessionCheck');

router.get('/', sessionCheck.isAdmin, homeController.getHomePage);

router.get('/login', sessionCheck.isLoggedIn, homeController.getLoginPage);

router.get('/about', homeController.getAboutPage);

// router.get('/register', homeController.getRegisterPage);

router.get('/file/:fileID', homeController.getFilePage);

router.get('/download/file/:fileID', homeController.getDownloadPage);

router.get('/admin', sessionCheck.isAdmin, homeController.getAdminPage);

router.get('/logout', homeController.logout);

module.exports = router;
