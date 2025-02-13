const db = require('../models');
const jwt = require('jsonwebtoken');

exports.store = async (req, res) => {
    try {
        const { arab, latin, id_setoran } = req.body
        const payload = {
            arab: arab,
            latin: latin,
            id_setoran: id_setoran
        };

        const created = await db.item_setoran.create(payload);
        return res.json({
            status: true,
            message: 'saved data successfully',
            data: created
        })
    }catch (error) {
        return res.json({
            status: false,
            message: 'Failed to saved data',
            error
        })
    }
}

exports.getAll = async (req, res) => {
    try {
        const setoran = await db.item_setoran.findAll({
            where : { id_setoran : req.params.id}
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
        const Setoran = await db.item_setoran.findByPk(req.params.id);
        if (!Setoran) throw new Error('Setoran not found');
        let payload = {
            arab: req.body.arab,
            latin: req.body.latin,
            id_setoran: req.body.id_setoran
        }
        console.log(payload)
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
        const Setoran = await db.item_setoran.findByPk(req.params.id);
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
