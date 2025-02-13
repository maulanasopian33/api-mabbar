const express = require('express');
const { store, getAll, updateSetoran, deleteSetoran } = require('../controllers/itemSetoran');
const router = express.Router();

router.post('/', store);
router.get('/:id', getAll);
router.put('/:id', updateSetoran);
router.delete('/:id', deleteSetoran);

module.exports = router;