const express = require('express');
const router = express.Router();
const { store, getData, getRangking } = require('../controllers/penilaianSetoran');

router.post('/', store);
router.get('/:id/:id_setoran', getData);
router.get('/get-rangking', getRangking);
// router.put('/:id', updateSiswa);
// router.delete('/:id', deleteSiswa);
module.exports = router;