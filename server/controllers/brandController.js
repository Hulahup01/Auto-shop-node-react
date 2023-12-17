const {Brand} = require('../models/models')
const ApiError = require('../error/apiError');

class BrandController {
    async create(req, res) {
        const {name} = req.body
        const brand = await Brand.create({name})
        return res.json(brand)
    }

    async update(req, res) {

    }

    async delete(req, res) {

    }

    async getAll(req, res) {
        
    }

    async getById(req, res) {
        const brands = await Brand.findAll()
        return res.json(brands)
    }
}

module.exports = new BrandController()