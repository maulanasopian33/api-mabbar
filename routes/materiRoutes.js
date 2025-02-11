const express = require('express');
const {
  getAllMateri,
  getMateriById,
  createMateri,
  updateMateri,
  deleteMateri,
} = require('../controllers/materiController');

const router = express.Router();

router.get('/', getAllMateri);
router.get('/:id', getMateriById);
router.post('/', createMateri);
router.put('/:id', updateMateri);
router.delete('/:id', deleteMateri);

module.exports = router;
