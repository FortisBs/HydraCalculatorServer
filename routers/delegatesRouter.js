const Router = require('express');
const router = new Router();
const delegateController = require('../controllers/delegatesController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.get('/getBy', authMiddleware, delegateController.getDelegateByQuery);

router.get('/', roleMiddleware('ADMIN'), delegateController.getDelegates);

router.post('/', authMiddleware, delegateController.addDelegate);

router.patch('/', authMiddleware, delegateController.updateDelegate);

router.delete('/:id', authMiddleware, delegateController.deleteDelegate);

module.exports = router;
