const tokenService = require('../services/tokenService')
const pgdb = require('../pgdb')
const bcrypt = require('bcryptjs')
const apiError = require('../exceptions/apiError')
const validateStrsService = require('./validateStrsService')
const geoService = require('./geoService')

class storagesService {
    
    async createStorage(coord, name, descr, status, addres, token){
        const decoded = tokenService.validateToken(token)
        if(decoded.data.status < 3){
            throw apiError.BadRequest('ACCESS_ERROR', `Ошибка доступа.`)
        }
        if(!validateStrsService.validateCoords(coord))
            throw apiError.BadRequest('Неправильный формат координат');
        const dialogaded = await pgdb.query('INSERT INTO storages (coord, addres, status, user_created, date_created, time_created, name, descr) values ($1, $2, $3, $4, current_date, localtime(0), $5, $6) RETURNING id', [coord, addres, status, decoded.data.id, name, descr])
        if (dialogaded.rowCount > 0)
            return dialogaded.rows[0].id
        else
            throw apiError.BadRequest('Ошибка создания');
    }

    async updateStorage(coord, name, descr, status, addres, id, token){
        const decoded = tokenService.validateToken(token)
        if(decoded.data.status < 3){
            throw apiError.BadRequest('ACCESS_ERROR', `Ошибка доступа.`)
        }
        if(!validateStrsService.validateCoords(coord))
            throw apiError.BadRequest('Неправильный формат координат');
        const dialogaded = await pgdb.query('UPDATE storages SET coord = $1, addres = $2, status = $3, name = $4, descr = $5, user_created = $6 WHERE id = $7 RETURNING id', [coord, addres, status, name, descr, decoded.data.id, id])
        if (dialogaded.rowCount > 0)
            return dialogaded.rows[0].id
        else
            throw apiError.BadRequest('Ошибка создания');
    }

    async getStorage(id, count, page){
        count ? null : count = 10
        page ? null : page = 1
        let count_all = 0
        if(id != 'all')
            id = ' WHERE id = ' + id
        else
            id = ''
        const dialogaded = await pgdb.query('SELECT storages.id, storages.addres, storages.coord, storages.date_created, storages.time_created, storages.name, storages.descr, storages.status, users.login FROM storages left join users on storages.user_created = users.user_id' + id + ' order by id desc LIMIT $1 OFFSET $2', [count, count * (page - 1)])
        count_all = await pgdb.query("SELECT count(*) as count FROM storages " + id)
        return [dialogaded.rows, count_all.rows[0].count]
    }

    async getStoragesCoords(){
        const dialogaded = await pgdb.query('SELECT id, coord FROM storages order by id desc')
        return dialogaded.rows
    }

    async getClosestStorageByCoords(coord, radius){
        let queryText = 'SELECT * FROM storages where status = 1';

        const res = await pgdb.query(queryText);
        
        // Преобразование градусов в радианы
        function toRadians(degrees) {
            return degrees * Math.PI / 180;
          }

        // Функция для вычисления расстояния между двумя точками на поверхности Земли
        function calculateDistance(lat1, lon1, lat2, lon2) {
            const R = 6371; // Радиус Земли в километрах
            const f1 = toRadians(lat1);
            const f2 = toRadians(lat2);
            const df = toRadians(lat2 - lat1);
            const dl = toRadians(lon2 - lon1);
          
            const a = Math.sin(df / 2) * Math.sin(df / 2) +
                    Math.cos(f1) * Math.cos(f2) *
                    Math.sin(dl / 2) * Math.sin(dl / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distance = R * c * 1000; // переводим в метры
          
            return distance;
          }
        const coordInp = coord.split('/')
        // Обработка результатов запроса
        const storages = res.rows.map(row => {
            const coordsBD = row.coord.split('/').map(parseFloat);
            const distanse = calculateDistance(coordInp[0], coordInp[1], coordsBD[0], coordsBD[1]);
            return {
                id: row.id,
                addr: row.addres,
                coordsBD,
                distanse
            };
        }).filter(storage => storage.distanse <= radius);
    
        // Сортировка складов по расстоянию
        storages.sort((a, b) => a.distanse - b.distanse);

        return storages
    }

    async getClosestStorageByRodeDist(coord, radius){
        const res = await pgdb.query('SELECT * FROM storages');
        const coordInp = coord.split('/');

        // Обработка результатов запроса
        const storages = await Promise.all(res.rows.map(async row => {
            const coordsBD = row.coord.split('/').map(parseFloat);
            let distance = await geoService.calculateDistanceByRode(coordInp[0], coordInp[1], coordsBD[0], coordsBD[1]);
            distance = distance[0]
            return {
                id: row.id,
                addr: row.addres,
                coordsBD,
                distance
            };
        }));
        
        const filteredStorages = storages.filter(storage => storage.distance <= radius);
        // Сортировка складов по расстоянию
        filteredStorages.sort((a, b) => a.distance - b.distance);

        return filteredStorages;
    }

    async getClosestStorages(coord, type, radius = 10000, not_to_look = []){
        if(!validateStrsService.validateCoords(coord))
            throw apiError.BadRequest('Неправильный формат координат');
        if(type === 'coord')
            return this.getClosestStorageByCoords(coord, radius, not_to_look)
        else
            return this.getClosestStorageByRodeDist(coord,radius)
    }

    async getItemsInStorage(storageId, count, page, filter){
        let filter_str = ''
        if(filter != 'all'){
            const types = await pgdb.query('SELECT type_id FROM items_types where type_id = $1', [filter])
            if(types.rowCount = 0){
                throw apiError.BadRequest('VALID_ERROR', `Не найденная категория.`)
            }
            filter_str = ' and items_types.type_id = ' + types.rows[0].type_id
        }
        const items = await pgdb.query(`SELECT items_in_storages.id, items_in_storages.count, items_in_storages.item_id, items.name, items.descr, items.type, items.flag, items_types.type_name FROM items_in_storages JOIN items ON items_in_storages.item_id = items.id JOIN items_types ON items.type = items_types.type_id WHERE items_in_storages.storage_id = $3 ${filter_str} ORDER BY id DESC LIMIT $1 OFFSET $2`, [count, count * (page - 1), storageId])
        return items.rows
    }

    async addItemCountToStorage(id, count, type, token){
        const decoded = tokenService.validateToken(token)
        if(decoded.data.status < 3){
            throw apiError.BadRequest('ACCESS_ERROR', `Ошибка доступа.`)
        }
        let addCount = 0
        if(type == 'plusmin'){
            const countNow = await pgdb.query('SELECT count FROM items_in_storages where id = $1', [id])
            if(Number(countNow.rows[0].count) + Number(count) < 0){
                throw apiError.BadRequest('ERROR', `При уменьшении получается меньше 0`)
            }
            addCount = Number(countNow.rows[0].count) + Number(count)
        }else{
            if(count < 0){
                throw apiError.BadRequest('ERROR', `При добавлении получается меньше 0`)
            }
            addCount = Number(count)
        }
        const dialogaded = await pgdb.query('UPDATE items_in_storages SET count = $1 where id = $2 RETURNING id, count', [addCount, id])
        return dialogaded.rows[0]
    }

    async addItemToStorage(storage_id, item_id, count, token){
        const decoded = tokenService.validateToken(token)
        if(decoded.data.status < 3){
            throw apiError.BadRequest('ACCESS_ERROR', `Ошибка доступа.`)
        }
        if(!storage_id || storage_id < 1){
            throw apiError.BadRequest('ERROR', `Неправильно задан склад`)
        }
        if(!item_id || item_id < 1){
            throw apiError.BadRequest('ERROR', `Требуется задать предмет`)
        }
        let addCount = Number(count)
        const exist = await pgdb.query('SELECT id FROM items_in_storages where item_id = $1 and storage_id = $2', [item_id, storage_id])
        if(exist.rowCount > 0){
            throw apiError.BadRequest('ERROR', `Товар уже есть на складе`)
        }
        if(addCount < 0){
            throw apiError.BadRequest('ERROR', `При добавлении получается меньше 0`)
        }
        const added = await pgdb.query('INSERT INTO items_in_storages (item_id, storage_id, count) VALUES ($1, $2, $3) RETURNING id', [item_id, storage_id, count]);
        const items = await pgdb.query(`SELECT items_in_storages.id, items_in_storages.count, items_in_storages.item_id, items.name, items.descr, items.type, items.flag, items_types.type_name FROM items_in_storages JOIN items ON items_in_storages.item_id = items.id JOIN items_types ON items.type = items_types.type_id WHERE items_in_storages.id = $1`, [added.rows[0].id])
        return items.rows[0]
    }

    async deleteItemFromStorage(id, token){
        const decoded = tokenService.validateToken(token)
        if(decoded.data.id < 3){
            throw apiError.BadRequest('ACCESS_ERROR', `Ошибка доступа.`)
        }
        const exist = await pgdb.query('SELECT id FROM items_in_storages where id = $1', [id])
        if(exist.rowCount == 0){
            throw apiError.BadRequest('ERROR', `Товар нет на складе`)
        }
        pgdb.query('DELETE FROM items_in_storages WHERE id = $1', [id]);
        return "OK"
    }

    async searchItem(str, limit, storageId, type = "all") {
        let exit;
        let searchString = `%${str}%`; // Добавляем знаки % к строке для поиска подстроки
    
        if (type == "all") {
            exit = await pgdb.query(`
                SELECT items.id, items.name, items.descr, items.type, items.flag, items_types.type_name
                FROM items 
                JOIN items_types ON items.type = items_types.type_id 
                WHERE lower(items.name) LIKE lower($1)
                ORDER BY items.id DESC
                LIMIT $2
            `, [searchString, limit]);
        } else {
            exit = await pgdb.query(`
                SELECT items_in_storages.id, items_in_storages.count, items_in_storages.item_id, items.name, items.descr, items.type, items.flag, items_types.type_name FROM items_in_storages 
                JOIN items ON items_in_storages.item_id = items.id 
                JOIN items_types ON items.type = items_types.type_id 
                WHERE items_in_storages.storage_id = $1 AND lower(items.name) LIKE lower($2)
                ORDER BY id DESC
                LIMIT $3
            `, [storageId, searchString, limit]);
        }
    
        if (exit.rowCount > 0) {
            return exit.rows;
        } else {
            return null; // Возвращаем null вместо 'null'
        }
    }
    
}

module.exports = new storagesService();