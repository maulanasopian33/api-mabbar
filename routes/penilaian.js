const express = require('express');
const router = express.Router();
const { getpenilaianGuru, updatePenilaian, getpenilaianSiswa } = require('../controllers/penilaianController');

// router.post('/', addSiswa);
router.get('/guru/:id', getpenilaianGuru);
router.put('/', updatePenilaian);
router.get('/siswa', getpenilaianSiswa);
// router.delete('/:id', deleteSiswa);
module.exports = router;