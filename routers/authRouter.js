const Router = require('express');
const router = new Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.post('/registration', authController.registration);

router.post('/login', authController.login);

router.get('/users', roleMiddleware('ADMIN'), authController.getUsers);

router.get('/users/:id', authMiddleware, authController.getUser);

module.exports = router;
