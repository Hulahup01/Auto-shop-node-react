const {Type} = require('../models/models')
const ApiError = require('../error/apiError');

class TypeController {
    async create(req, res) {
        const {name} = req.body
        const type = await Type.create({name})
        return res.json(type)
    }

    async update(req, res) {

    }

    async delete(req, res) {

    }

    async getAll(req, res) {
        const types = await Type.findAll()
        return res.json(types)
    }

    async getById(req, res) {
        
    }
}

module.exports = new TypeController()