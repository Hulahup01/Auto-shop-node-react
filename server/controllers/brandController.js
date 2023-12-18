const {Brand} = require('../models/models');
const ApiError = require('../error/apiError');

class BrandController {
    async create(req, res, next) {
        try {
            const {name} = req.body;
            const brand = await Brand.create({name});
            return res.json(brand);
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
    
            const [updatedRowsCount, updatedBrand] = await Brand.update(
                { name },
                {
                    where: { id },
                    returning: true,
                    plain: true,
                }
            );
    
            if (updatedRowsCount === 0) {
                return res.status(404).json({ message: 'Brand not found' });
            }
    
            res.json(updatedBrand);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params;
            const brand = await Brand.destroy(
                {
                    where: {id}
                },
            );

            if (brand == 0) {
                return res.status(404).json({ message: 'Brand not found' });
            }

            res.json({ message: `Brand ${brand} deleted successfully`});
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const brands = await Brand.findAll();
            return res.json(brands);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async getById(req, res) {
        try {
            const {id} = req.params;
            const brand = await Brand.findOne(
                {
                    where: {id}
                },
            );
            if (!brand) {
                return res.status(404).json({ message: 'Brand not found' });
            }
            res.json(brand);
        } catch (e) {
            (e.name === 'ValidationError') ?
                next(ApiError.badRequest(e.message)) :
                next(ApiError.internal(e.message));
        }
    }
}

module.exports = new BrandController();