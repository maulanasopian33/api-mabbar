const jwt = require('jsonwebtoken');
const { latihan, penilaian_setoran, item_setoran } = require('../models');


exports.store = async (req, res) => {
    try {
        const { id_siswa, id_setoran, id_item, status } = req.body
        const payload = {
            id_penilaian: id_siswa + "-" + id_item,
            id_siswa: id_siswa,
            id_setoran: id_setoran,
            id_item: id_item,
            status: status
        };

        const created = await penilaian_setoran.upsert(payload);
        return res.json({
            status: true,
            message: 'saved data successfully',
            data: created
        })
    } catch (error) {
        return res.json({
            status: false,
            message: 'Failed to saved data',
            error
        })
    }
}

exports.getData = async (req, res) => {
    try {
        const setoran = await item_setoran.findAll({
            where: {
                id_setoran: req.params.id_setoran
            }
        })
        const Penilaian = await penilaian_setoran.findAll({
            where: {
                id_siswa: req.params.id
            }
        });
        let penilaianTotal = setoran.map((item) => {
            let existingPenilaian = Penilaian.find((item2) => item2.id_item === item.id_item);
        
            return existingPenilaian
                ? {
                    id_penilaian: existingPenilaian.id_penilaian, // Bisa null atau string default
                    id_setoran: existingPenilaian.id_setoran,
                    id_siswa:existingPenilaian.id_siswa,
                    arab: item.arab,
                    latin: item.latin,
                    status:true
                }
                : {
                    id_penilaian: null, // Bisa null atau string default
                    id_setoran: item.id_setoran,
                    id_siswa:req.params.id,
                    arab: item.arab,
                    latin: item.latin,
                    status:false
                };
        });
        res.json({
            status: true,
            data: penilaianTotal,
        });
    } catch (error) {
        res.json({ status: false, message: error.message, error });
    }
};