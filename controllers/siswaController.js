const { siswa } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.getAllSiswa = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'mabbar');
        const Siswa = await siswa.findAll({
            where : { user_id : decoded.userId }
        });
        res.json({
            status: true,
            data : Siswa
        });
    } catch (error) {
        res.json({ status : false, message: error.message, error });
    }
};

exports.addSiswa = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'mabbar');
        const { nama, password } = req.body;
        const payload = {
            nama : nama,
            password : password,
            user_id : decoded.userId
        }
        const Siswa = await siswa.create(payload);
        res.json({ status: true, message: 'Add Siswa successfully', Siswa });
    } catch (error) {
        res.json({ status: false, message: error.message, error });
    }
};
exports.updateSiswa = async (req, res) => {
    try {
      const Siswa = await siswa.findByPk(req.params.id);
      if (!Siswa) throw new Error('Siswa not found');
      let payload = req.body
      if(payload.password){
        payload.password = await bcrypt.hash(payload.password, 10)
      }
      await Siswa.update(payload);
      res.json({ status: true, message: 'Siswa updated successfully', Siswa });
    } catch (error) {
      res.json({ status: false, message: error.message, error });
    }
  };

exports.deleteSiswa = async (req, res) => {
    try {
      const Siswa = await siswa.findByPk(req.params.id);
      if (!Siswa) throw new Error('Siswa not found');
      await Siswa.destroy();
      res.json({ status: true, message: 'Siswa deleted successfully' });
    } catch (error) {
      res.json({ status: false, message: error.message, error });
    }
  };

exports.login = async (req, res) => {
  try {
    const { nama, password } = req.body;
    const Siswa = await siswa.findOne({ where: { nama : nama } });
    if (!Siswa) throw new Error('Siswa not found');
    const isMatch = await bcrypt.compare(password, Siswa.password);
    if (!isMatch) throw new Error('Invalid credentials');
    const token = jwt.sign({ userId: Siswa.user_id, idSiswa: Siswa.id }, 'mabbar', { expiresIn: '1h' });
    res.json({ status: true, message: 'Login successful', data : {
      token : token,
      nama : Siswa.nama
    } });
  } catch (error) {
    res.json({ status : false, message: error.message, error });
  }
};