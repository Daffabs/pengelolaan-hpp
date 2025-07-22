const express = require('express');
const router = express.Router();
const uangMasukController = require('../controllers/uangMasukController');

router.get('/', uangMasukController.getAll);
router.post('/', uangMasukController.add);
router.put('/:id', uangMasukController.update);
router.delete('/:id', uangMasukController.delete);

module.exports = router;