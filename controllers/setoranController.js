const db = require('../models');
const jwt = require('jsonwebtoken');

exports.store = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'mabbar');
        const { tema, deskripsi } = req.body
        const payload = {
            tema: tema,
            deskripsi: deskripsi,
            user_id: decoded.userId
        };

        const created = await db.list_setoran.create(payload);
        console.log(created)
        return res.json({
            status: true,
            message: 'saved data successfully',
            data: created
        })
    }catch (error) {
        console.log(error)
        return res.json({
            status: false,
            message: 'Failed to saved data',
            error
        })
    }
}

exports.getAll = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'mabbar');
        const setoran = await db.list_setoran.findAll({
            where : { user_id : decoded.userId }
        });
        res.json({
            status: true,
            data : setoran
        });
    } catch (error) {
        res.json({ status : false, message: error.message, error });
    }
};

exports.updateSetoran = async (req, res) => {
    try {
        const Setoran = await db.list_setoran.findByPk(req.params.id);
        if (!Setoran) throw new Error('Setoran not found');
        let payload = {
            tema : req.body.tema,
            deskripsi : req.body.deskripsi
        }
        await Setoran.update(payload);
        res.json({
            status: true,
            message: 'Setoran updated successfully',
            Setoran
        });
    } catch (error) {
        res.json({
            status: false,
            message: error.message,
            error
        });
    }
};

exports.deleteSetoran = async (req, res) => {
    try {
        const Setoran = await db.list_setoran.findByPk(req.params.id);
        if (!Setoran) throw new Error('id Setoran not found');
        await Setoran.destroy();
        res.json({
            status: true,
            message: 'Setoran deleted successfully'
        });
    } catch (error) {
        res.json({
            status: false,
            message: error.message,
            error
        });
    }
};
