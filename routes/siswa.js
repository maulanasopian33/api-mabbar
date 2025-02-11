const express = require('express');
const router = express.Router();
const { addSiswa, getAllSiswa, deleteSiswa, updateSiswa, login } = require('../controllers/siswaController');

router.post('/', addSiswa);
router.get('/', getAllSiswa);
router.put('/:id', updateSiswa);
router.delete('/:id', deleteSiswa);
router.post('/login',login)
module.exports = router;