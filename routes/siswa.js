const express = require('express');
const router = express.Router();
const { addSiswa, getAllSiswa, deleteSiswa, updateSiswa } = require('../controllers/siswaController');

router.post('/', addSiswa);
router.get('/', getAllSiswa);
router.put('/:id', updateSiswa);
router.delete('/:id', deleteSiswa);
module.exports = router;