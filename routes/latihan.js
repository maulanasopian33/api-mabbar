const express = require('express');
const router = express.Router();
const { createLatihan, getAllLatihan, deleteLatihan, updateLatihan, getLatihanById, createSoalPG, getAllSoalPG, deleteSoalPG, storePenilaian, getPenilaianbyId } = require('../controllers/latihanController');

router.post('/', createLatihan);
router.get('/', getAllLatihan);
router.get('/get/:id', getLatihanById);
router.put('/:id', updateLatihan);
router.delete('/:id', deleteLatihan);

router.post('/soal-pg', createSoalPG);
router.get('/soal-pg/:id', getAllSoalPG);
router.delete('/soal-pg/:id', deleteSoalPG);

router.post('/nilai', storePenilaian);
router.get('/nilai/:id', getPenilaianbyId);

module.exports = router;