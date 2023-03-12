const Router = require('express');
const router = new Router();
const delegateController = require('../controllers/delegatesController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/getBy', delegateController.getDelegateByQuery);

router.get('/', delegateController.getDelegates);

router.post('/', authMiddleware, delegateController.addDelegate);

router.patch('/', authMiddleware, delegateController.updateDelegate);

router.delete('/:id', authMiddleware, delegateController.deleteDelegate);

module.exports = router;
