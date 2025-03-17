const { materi, listlampiran, user } = require('../models');
const jwt = require('jsonwebtoken');

// Get all materi
exports.getAllMateri = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'mabbar');
    const Materi = await materi.findAll({
        where : { 
          user_id : decoded.userId,
          materi : req.query.id
         },
        include: [
            { model: listlampiran },
            { model: user, attributes: { exclude: ['password']} }
        ]
    });
    res.json({
        status: true,
        data : Materi
    });
  } catch (error) {
    res.json({ status : false, message: error.message, error });
  }
};

// Get materi by ID
exports.getMateriById = async (req, res) => {
  try {
    const Materi = await materi.findByPk(req.params.id, { 
        include: [
            { 
              model: listlampiran,
              order: [['updatedAt', 'ASC']]
            },
            { model: user, attributes: { exclude: ['password']} }
        ]
    });
    if (!Materi) throw new Error('Materi not found');
    res.json({
        status: true,
        data : Materi
    });
  } catch (error) {
    res.json({ status: false, message: error.message, error });
  }
};

// Create new materi
exports.createMateri = async (req, res) => {
  try {
    const { judul, featureimage, content, lampiran } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'mabbar');
    const nm_materi = req.body.materi
    const newMateri = await materi.create(
      { 
        judul : judul || '',
        materi : nm_materi || '',
        featureimage : featureimage || '',
        content : content || '',
        user_id : decoded.userId 
      });
    const convertLampiran = lampiran.map((item) => {
      return {
        idmateri : newMateri.idmateri,
        jenis : item.type,
        file : item.path
      }
    })
    const newLampiran = await listlampiran.bulkCreate(convertLampiran);
    
    res.json({
        status: true,
        data : newMateri
    });
  } catch (error) {
    res.json({ status: false, message: error.message, error });
  }
};

// Update materi
exports.updateMateri = async (req, res) => {
  try {
    const Materi = await materi.findByPk(req.params.id);
    if (!Materi) throw new Error('Materi not found');

    await Materi.update(req.body);
    const convertLampiran = req.body.lampiran.map((item) => {
      return {
        idlampiran : item.idlampiran,
        idmateri : req.body.idmateri,
        jenis : item.jenis,
        file : item.file
      }
    })
    await listlampiran.destroy({
      where: { idmateri: req.body.idmateri }
    });
    const newLampiran = await listlampiran.bulkCreate(convertLampiran, {
      updateOnDuplicate: ["file"]
    });
    res.json({ status: true, message: 'Materi updated successfully', materi });
  } catch (error) {
    res.json({ status: false, message: error.message, error });
  }
};

// Delete materi (Cascade delete lampiran)
exports.deleteMateri = async (req, res) => {
  try {
    const Materi = await materi.findByPk(req.params.id);
    if (!Materi) throw new Error('Materi not found');

    await Materi.destroy();
    res.json({ status: true, message: 'Materi deleted successfully' });
  } catch (error) {
    res.json({ status: false, message: error.message, error });
  }
};
