const geoService = require('../services/geoService')
const {validationResult} = require('express-validator')
const apiError = require('../exceptions/apiError')

class GeoController {

    async getAddress(req, res, next){
        try{
            const addr = req.query.q
            const coord = req.query.coord
            let coordFlag = false
            if (coord == 'true'){
                coordFlag = true
            }
            const pointData = await geoService.getAddress(addr, coordFlag)
            res.json(pointData)
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new GeoController()