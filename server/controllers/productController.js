const uuid = require('uuid');
const path = require('path');
const {Product, ProductInfo} = require('../models/models');
const ApiError = require('../error/apiError');


class ProductController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body;
            const {img} = req.files;
            let fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', fileName));

            const product = await Product.create({name, price, brandId, typeId, img: fileName});

            if (info) {
                info = JSON.parse(info);
                info.forEach(i =>
                    ProductInfo.create({
                        title: i.title,
                        description: i.description,
                        productId: product.id
                    })
                )
            }

            return res.json(product);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }

    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { name, price, brandId, typeId, info } = req.body;

            const product = await Product.findByPk(id);

            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            let updatedFields = { name, price, brandId, typeId };

            if (info) {
                const parsedInfo = JSON.parse(info);
                await ProductInfo.destroy({ where: { productId: id } });
                parsedInfo.forEach(i =>
                    ProductInfo.create({
                        title: i.title,
                        description: i.description,
                        productId: id
                    })
                );
            }
 
            await product.update(updatedFields);

            return res.json(product);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;

            const product = await Product.findByPk(id);

            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            await ProductInfo.destroy({ where: { productId: id } });

            await product.destroy();

            return res.json({ message: `Product ${id} deleted successfully` });
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async getAll(req, res) {
        let {brandId, typeId, limit, page} = req.query;
        page = page || 1 ;
        limit = limit || 9;
        let offset = page * limit - limit;
        let products;
        if (!brandId && !typeId) {
            products = await Product.findAndCountAll({limit, offset});
        }
        if (brandId && !typeId) {
            products = await Product.findAndCountAll({where:{brandId}, limit, offset});
        }
        if (!brandId && typeId) {
            products = await Product.findAndCountAll({where:{typeId}, limit, offset});
        }
        if (brandId && typeId) {
            products = await Product.findAndCountAll({where:{brandId, typeId}, limit, offset});
        }
        return res.json(products);
    }

    async getById(req, res) {
        const {id} = req.params;
        const product = await Product.findOne(
            {
                where: {id},
                include: [{model: ProductInfo, as: 'info'}]
            },
        )
        return res.json(product);
    }
}

module.exports = new ProductController()