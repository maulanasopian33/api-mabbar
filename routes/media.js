var express = require('express');
var router = express.Router();
const mediaController = require('../controllers/mediaControllers');

const upload = require('../config/multerConfig');

router.post('/:id', upload.single('file'), mediaController.store);
router.get('/get/:id', mediaController.get);

module.exports = router;
