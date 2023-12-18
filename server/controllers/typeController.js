const {Type} = require('../models/models');
const ApiError = require('../error/apiError');

class TypeController {
    async create(req, res, next) {
        try {
            const {name} = req.body;
            const type = await Type.create({name});
            return res.json(type);
        } catch (e) {
            (e.name === 'ValidationError') ?
                next(ApiError.badRequest(e.message)) :
                next(ApiError.internal(e.message));
        }     
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { name } = req.body;
    
            const [updatedRowsCount, updatedType] = await Type.update(
                { name },
                {
                    where: { id },
                    returning: true,
                    plain: true,
                }
            );
    
            if (updatedRowsCount === 0) {
                return res.status(404).json({ message: 'Type not found' });
            }
    
            res.json(updatedType);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }
    

    async delete(req, res, next) {
        try {
            const {id} = req.params;
            const type = await Type.destroy(
                {
                    where: {id}
                },
            );

            if (type == 0) {
                return res.status(404).json({ message: 'Type not found' });
            }

            res.json({ message: `Type ${type} deleted successfully`});
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const types = await Type.findAll();
            return res.json(types);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async getById(req, res, next) {
        try {
            const {id} = req.params;
            const type = await Type.findOne(
                {
                    where: {id}
                },
            );
            if (!type) {
                return res.status(404).json({ message: 'Type not found' });
            }
            res.json(type);
        } catch (e) {
            (e.name === 'ValidationError') ?
                next(ApiError.badRequest(e.message)) :
                next(ApiError.internal(e.message));
        }
    }
}

module.exports = new TypeController();