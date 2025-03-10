const jwt = require('jsonwebtoken');
const { latihan, penilaian_setoran, item_setoran, siswa } = require('../models');
const { Sequelize, Op } = require("sequelize");

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
exports.getRangking = async (req, res) => {
    try {
        // Menghitung jumlah status true untuk setiap id_siswa
        const Penilaian = await penilaian_setoran.findAll({
            attributes: [
                "id_siswa",
                [Sequelize.fn("COUNT", Sequelize.col("id_penilaian")), "jumlah"]
            ],
            include: [
                {
                    model: siswa,
                    attributes: ["nama"],
                },
            ],
            where: {
                status: true
            },
            group: ["id_siswa"],
            order: [[Sequelize.literal("jumlah"), "DESC"]] // Urutkan dari yang terbesar
        });

        // Menambahkan ranking berdasarkan urutan jumlah
        let rankingData = Penilaian.map((item, index) => ({
            id_siswa: item.id_siswa.toString(),
            nama : item.siswa.nama,
            jumlah: item.getDataValue("jumlah"),
            rangking: index + 1 // Peringkat berdasarkan urutan jumlah terbanyak
        }));

        res.json({
            status: true,
            data: rankingData,
        });
    } catch (error) {
        return res.json({
            status: false,
            message: 'Failed to retrieve data',
            error
        });
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
                    id_item : item.id_item,
                    id_penilaian: existingPenilaian.id_penilaian, // Bisa null atau string default
                    id_setoran: existingPenilaian.id_setoran,
                    id_siswa:existingPenilaian.id_siswa,
                    arab: item.arab,
                    latin: item.latin,
                    status: existingPenilaian.status
                }
                : {
                    id_penilaian: null, // Bisa null atau string default
                    id_setoran: item.id_setoran,
                    id_item : item.id_item,
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