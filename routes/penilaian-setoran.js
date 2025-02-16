const express = require('express');
const router = express.Router();
const { store, getData } = require('../controllers/penilaianSetoran');

router.post('/', store);
router.get('/:id/:id_setoran', getData);
// router.put('/:id', updateSiswa);
// router.delete('/:id', deleteSiswa);
module.exports = router;