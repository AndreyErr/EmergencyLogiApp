const tokenService = require('../services/tokenService')
const pgdb = require('../pgdb')
const bcrypt = require('bcryptjs')
const apiError = require('../exceptions/apiError');
const validateStrsService = require('./validateStrsService');

class geoService {
    
    async getAddress(addr, coordFlag){
        if(coordFlag){
            if(!validateStrsService.validateCoords(addr))
                throw apiError.BadRequest('Неправильный формат координат');
            addr = addr.replace("/", ",");
        }
        let result = NaN
        const query = new URLSearchParams({
            q: addr,
            locale: 'en',
            limit: '2',
            reverse: coordFlag,
            debug: 'false',
            point: (coordFlag) ? addr : '',
            provider: 'default',
            key: process.env.GraphhopperAPIKEY
        }).toString();
        
        const resp = await fetch(
          `https://graphhopper.com/api/1/geocode?${query}`,
          {method: 'GET'}
        );
        
        const data = await resp.text();
        result = data
        return result
    }

    async calculateDistanceByRode(lat1, lon1, lat2, lon2) {
        const query = new URLSearchParams({
            key: process.env.GraphhopperAPIKEY
        }).toString();

        return fetch(
            `https://graphhopper.com/api/1/route?${query}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    points: [
                        [lon2, lat2],
                        [lon1, lat1]
                    ],
                    details: ['road_class', 'surface'],
                    vehicle: 'car',
                    instructions: false,
                    calc_points: true,
                    points_encoded: false
                })
            }
        )
        .then(resp => resp.json())
        .then(data => {
            return [data.paths[0].distance, data];
        });
    }
}

module.exports = new geoService();