const jwt = require('jsonwebtoken');
const { latihan, penilaian, siswa } = require('../models');


exports.getpenilaianGuru = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'mabbar');
        const Penilaian = await penilaian.findAll({
            where: {
                id_latihan: req.params.id,
            },
            include: [
                {
                    model: siswa
                },
            ]
        });
        let temps = Penilaian.map((item) =>{
            return {
                id_penilaian : item.id_penilaian,
                id_latihan : item.id_latihan,
                nilai : item.nilai,
                nama_siswa : item.siswa.nama
            }
        })
        const Siswa = await siswa.findAll({
            where : {
                user_id : decoded.userId
            },
            attributes: ['id', 'nama'],
            order: [['nama', 'ASC']]
        });
        let penilaianTotal = Siswa.map((item) => {
            let existingPenilaian = temps.find((item2) => item2.nama_siswa === item.nama);
        
            return existingPenilaian
                ? existingPenilaian
                : {
                    id_penilaian: null, // Bisa null atau string default
                    id_latihan: req.params.id,
                    nilai: 0,
                    nama_siswa: item.nama
                };
        });
        res.json({
            status: true,
            data: penilaianTotal,
        });
    } catch (error) {
        res.json({ status: false, message: error.message, error });
    }
}