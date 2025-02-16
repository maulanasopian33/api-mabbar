const express = require('express');
const router = express.Router();
const { getpenilaianGuru } = require('../controllers/penilaianController');

// router.post('/', addSiswa);
router.get('/:id', getpenilaianGuru);
// router.put('/:id', updateSiswa);
// router.delete('/:id', deleteSiswa);
module.exports = router;