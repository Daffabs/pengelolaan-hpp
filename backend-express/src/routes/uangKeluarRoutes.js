const express = require('express');
const router = express.Router();
const uangKeluarController = require('../controllers/uangKeluarController');

router.get('/', uangKeluarController.getAll);
router.post('/', uangKeluarController.add);
router.put('/:id', uangKeluarController.update);
router.delete('/:id', uangKeluarController.delete);

module.exports = router;