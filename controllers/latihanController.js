const jwt = require('jsonwebtoken');
const { latihan, soal_pg, penilaian } = require('../models');

exports.getAllLatihan = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'mabbar');
        const Latihan = await latihan.findAll({
                where : { 
                    user_id : decoded.userId
                 }
        });
        res.json({
                status: true,
                data : Latihan
        });
    } catch (error) {
        res.json({ status : false, message: error.message, error });
    }
};
exports.getLatihanById = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'mabbar');
        const Latihan = await latihan.findAll({
                where : { 
                    user_id : decoded.userId,
                    id_latihan : req.params.id

                 }
        });
        res.json({
                status: true,
                data : Latihan
        });
    } catch (error) {
        res.json({ status : false, message: error.message, error });
    }
};
exports.createLatihan = async (req, res) => {
    try {
        const { nama_latihan, jenis, materi } = req.body;
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'mabbar');
        const payload = {
            nama_latihan : nama_latihan,
            jenis : jenis,
            materi : materi,
            user_id : decoded.userId
        }
        const newLatihan = await latihan.create(payload);
        res.json({
            status: true,
            message: 'Latihan Added successfully',
            data : newLatihan
        });
    } catch (error) {
        res.json({ status: false, message: error.message, error });
    }
};

exports.deleteLatihan = async (req, res) => {
    try {
        const Latihan = await latihan.findByPk(req.params.id);
        if (!Latihan) throw new Error('Latihan not found');
        await Latihan.destroy();
        res.json({
            status: true,
            message: 'Latihan deleted successfully'
        });
    } catch (error) {
        res.json({
            status: false,
            message: error.message,
            error
        });
    }
};

exports.updateLatihan = async (req, res) => {
    try {
        const Latihan = await latihan.findByPk(req.params.id);
        if (!Latihan) throw new Error('Latihan not found');
        const { nama_latihan, jenis, materi } = req.body;
        await Latihan.update({
            nama_latihan : nama_latihan,
            jenis : jenis,
            materi : materi
        });
        res.json({
            status: true,
            message: 'Latihan updated successfully',
            Latihan
        });
    } catch (error) {
        res.json({
            status: false,
            message: error.message,
            error
        });
    }
};
// soal PG
exports.getAllSoalPG = async (req, res) => {
    try {
        const Soal = await soal_pg.findAll({
                where : { 
                    id_latihan : req.params.id
                 }
        });
        res.json({
                status: true,
                data : Soal
        });
    } catch (error) {
        res.json({ status : false, message: error.message, error });
    }
};

exports.createSoalPG = async (req, res) => {
    try {
        const { id_latihan, soal, lampiran, pilihan_a, pilihan_b, pilihan_c, pilihan_d, kunci_jawaban } = req.body;
        const payload = {
            id_latihan : id_latihan,
            soal : soal,
            lampiran : lampiran,
            pilihan_a : pilihan_a,
            pilihan_b : pilihan_b,
            pilihan_c : pilihan_c,
            pilihan_d : pilihan_d,
            kunci_jawaban : kunci_jawaban,
        }
        const Soal = await soal_pg.create(payload);
        res.json({
            status: true,
            message: 'Soal Added successfully',
            data : Soal
        });
    } catch (error) {
        res.json({ status: false, message: error.message, error });
    }
};

exports.deleteSoalPG = async (req, res) => {
    try {
        const Soal = await soal_pg.findByPk(req.params.id);
        if (!Soal) throw new Error('Soal not found');
        await Soal.destroy();
        res.json({
            status: true,
            message: 'Soal deleted successfully'
        });
    } catch (error) {
        res.json({
            status: false,
            message: error.message,
            error
        });
    }
};

exports.storePenilaian = async (req, res) => {
    try {
        const { id_latihan, nilai } = req.body;
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'mabbar');
        const payload = {
            id_latihan : id_latihan,
            id_penilaian : decoded.idSiswa+"-"+id_latihan,
            id_siswa : decoded.idSiswa,
            nilai : nilai,
        }
        const Penilaian = await penilaian.upsert(payload);
        res.json({
            status: true,
            message: 'Penilaian Added successfully',
            data : Penilaian
        });
    } catch (error) {
        res.json({ status: false, message: error.message, error });
    }
};

exports.getPenilaianbyId = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'mabbar');
        const Penilaian = await penilaian.findAll({
                where : { 
                    id_latihan : req.params.id,
                    id_siswa : decoded.idSiswa,
                 }
        });
        res.json({
                status: true,
                data : Penilaian
        });
    } catch (error) {
        res.json({ status : false, message: error.message, error });
    }
};