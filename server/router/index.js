const Router = require('express').Router;
const userController = require('../controllers/user-controller');

// Create a new router instance
const router = new Router();

// Define routes and map them to controller functions
router.post('/registration', userController.registrationController);
router.post('/login', userController.loginController);
router.post('/logout', userController.logoutController);
router.get('/activate/:link', userController.activateController);
router.get('/refresh', userController.refreshController);
router.get('/users', userController.getUsersController);

module.exports = router;