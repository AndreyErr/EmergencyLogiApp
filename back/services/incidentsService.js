const tokenService = require('./tokenService')
const pgdb = require('../pgdb')
const bcrypt = require('bcryptjs')
const apiError = require('../exceptions/apiError')
const patternValidateService = require('./patternValidateService')
const incidentsValidateService = require('./incidentsValidateService')
const validateStrsService = require('./validateStrsService')
const storagesService = require('./storagesService')
const geoService = require('./geoService')
const { sent } = require('./externalLinkService')

class incidentsService {
    
    async createIncident(coord, incidents, token){

        const decoded = tokenService.validateToken(token)

        if(decoded.data.access == 3){
            throw apiError.BadRequest('ACCESS_ERROR', `Ошибка доступа.`)
        }

        const validJson = JSON.stringify(incidents);

        if(!validateStrsService.validateCoords(coord))
            throw apiError.BadRequest('Неправильный формат координат');

        if(!incidentsValidateService.isValidJSON(validJson))
            throw apiError.BadRequest('Ошибка валидации: Невалидный json');

        const validateResult = await incidentsValidateService.validateIncidentInput(incidents)

        incidents = {"input_incident_information": incidents}
        let id
        if (validateResult == true){
            try {
                const item = await pgdb.query(
                    `INSERT INTO incidents (coord, json, user_created, date_created, time_created) 
                     VALUES ($1, $2, $3, current_date, localtime(0)) 
                     RETURNING id`,
                    [coord, incidents, decoded.data.id]
                  );
                id = item.rows[0].id
            } catch (err) {
                if (err.code == '23505') {
                    throw apiError.BadRequest("VALIDATE_ERROR", `Ошибка: Уникальный ключ ${code_name} уже существует.`);
                } else {
                    throw apiError.InternalError();
                }
            }
        }
        return id
    }

    async getItemsListForIncident(incidents){
        let outputJson = {}
        let outputJsonByIncident = {}
        for (let code_name in incidents) {
            outputJsonByIncident[code_name] = {"items" : {}, "react_time": 0}
            let inputPatternKeysArray = [] //
            let usedInputKeysArray = [] // Кодовые названия введённх происшествий
            const input_pattern_db = await pgdb.query(`
            SELECT json->'pattern_reaction' AS pattern_react, json->'time' AS time
            FROM patterns
            WHERE code_name = $1 and type = 'reaction';`, [code_name])
            const pattern_react_for_code_name = input_pattern_db.rows[0].pattern_react
            outputJsonByIncident[code_name].react_time = input_pattern_db.rows[0].time
            for (let inputKey in pattern_react_for_code_name){
                inputPatternKeysArray.push(inputKey)
                if (pattern_react_for_code_name[inputKey] == 'PATTERN_COMMON'){
                    const input_pattern_common_db = await pgdb.query(`
                    SELECT json->'pattern_reaction' AS pattern_react
                    FROM patterns
                    WHERE code_name = $1;`, [inputKey])
                    pattern_react_for_code_name[inputKey] = input_pattern_common_db.rows[0].pattern_react
                }
            }
            for (const [key, value_of_incident] of Object.entries(incidents[code_name])) {
                usedInputKeysArray.push(key)
                const patternReaction = pattern_react_for_code_name[key]
                if (patternReaction){
                    for (let item_index in patternReaction){
                        const item = patternReaction[item_index]
                        if(item.status == 'active'){
                            if (item.reaction_item != null){
                                if (item.reaction_item.value_type == 'generally'){
                                    if (item.item_name in outputJson){
                                        outputJson[item.item_name] += item.reaction_item.value
                                    }else{
                                        outputJson[item.item_name] = item.reaction_item.value
                                    }
                                    if (item.item_name in outputJsonByIncident[code_name].items){
                                        outputJsonByIncident[code_name].items[item.item_name] += item.reaction_item.value
                                    }else{
                                        outputJsonByIncident[code_name].items[item.item_name] = item.reaction_item.value
                                    }
                                }
                                if (item.reaction_item.value_type == 'per_1'){
                                    const value = Math.ceil(value_of_incident * item.reaction_item.value)
                                    if (item.item_name in outputJson){
                                        outputJson[item.item_name] += value
                                    }else{
                                        outputJson[item.item_name] = value
                                    }
                                    if (item.item_name in outputJsonByIncident[code_name].items){
                                        outputJsonByIncident[code_name].items[item.item_name] += value
                                    }else{
                                        outputJsonByIncident[code_name].items[item.item_name] = value
                                    }
                                }
                                if (item.reaction_item.value_type == 'custom'){
                                    const valueFarmula = item.reaction_item.value
                                    for(let operation in valueFarmula){
                                        operation = valueFarmula[operation]
                                        if(this.returnCompareResult(value_of_incident, operation[0], operation[1])){
                                            if (operation[2] == 'generally'){
                                                if (item.item_name in outputJson){
                                                    outputJson[item.item_name] += operation[3]
                                                }else{
                                                    outputJson[item.item_name] = operation[3]
                                                }
                                                if (item.item_name in outputJsonByIncident[code_name].items){
                                                    outputJsonByIncident[code_name].items[item.item_name] += operation[3]
                                                }else{
                                                    outputJsonByIncident[code_name].items[item.item_name] = operation[3]
                                                }
                                            }
                                            if (operation[2] == 'per_1'){
                                                const value = Math.ceil(value_of_incident * operation[3])
                                                if (item.item_name in outputJson){
                                                    outputJson[item.item_name] += value
                                                }else{
                                                    outputJson[item.item_name] = value
                                                }
                                                if (item.item_name in outputJsonByIncident[code_name].items){
                                                    outputJsonByIncident[code_name].items[item.item_name] += value
                                                }else{
                                                    outputJsonByIncident[code_name].items[item.item_name] = value
                                                }
                                            }
                                            break;
                                        }
                                    }
                                }
                            }else{
                                if(item.default_reaction_item != null){
                                    if (item.item_name in outputJson){
                                        outputJson[item.item_name] += item.default_reaction_item
                                    }else{
                                        outputJson[item.item_name] = item.default_reaction_item
                                    }
                                    if (item.item_name in outputJsonByIncident[code_name].items){
                                        outputJsonByIncident[code_name].items[item.item_name] += item.default_reaction_item
                                    }else{
                                        outputJsonByIncident[code_name].items[item.item_name] = item.default_reaction_item
                                    }
                                }
                            }
                        }
                    }
                }
            }
            var elementsNotUsed = [];
            for (var i = 0; i < inputPatternKeysArray.length; i++) {
                if (!usedInputKeysArray.includes(inputPatternKeysArray[i])) {
                    elementsNotUsed.push(inputPatternKeysArray[i]);
                }
            }
            for (const [key, list_of_def_react] of Object.entries(pattern_react_for_code_name)) {
                for(let keyNotUsed in elementsNotUsed){
                    keyNotUsed = elementsNotUsed[keyNotUsed]
                    
                    if(keyNotUsed == key){
                        for(const item_index in pattern_react_for_code_name[key]){
                            const item = pattern_react_for_code_name[key][item_index]
                            if(item.default_reaction_item != null){
                                if (item.item_name in outputJson){
                                    outputJson[item.item_name] += item.default_reaction_item
                                }else{
                                    outputJson[item.item_name] = item.default_reaction_item
                                }
                                if (item.item_name in outputJsonByIncident[code_name].items){
                                    outputJsonByIncident[code_name].items[item.item_name] += item.default_reaction_item
                                }else{
                                    outputJsonByIncident[code_name].items[item.item_name] = item.default_reaction_item
                                }
                            }
                        }
                    }
                }
            }
        }
        return {"need_items": outputJson, "need_items_by_incident": outputJsonByIncident}
    }

    returnCompareResult(val1, operator, val2){
        switch (operator) {
            case "=":
                return val1 == val2
            case ">":
                return val1 > val2
            case ">=":
                return val1 >= val2
            case "<":
                return val1 < val2
            case "<=":
                return val1 <= val2
        }
    }

    async addReactionResult(json, id){
        await pgdb.query(`
        UPDATE incidents
        SET json = json || '{"reaction": ${json}}'
        WHERE id = ${id};`)
    }

    async sendReactionResult(id) {
        const data = await pgdb.query(`
        SELECT json
        FROM incidents
        WHERE id = $1;`, [id])
        const json = data.rows[0].json
        const sendDataDB = await pgdb.query(`
        SELECT *
        FROM external_links
        WHERE link_status = 1;`)
        const sendData = sendDataDB.rows
    
        let results = {};
    
        for (let row of sendData) {
            const href = row.link_href;
            const response = await sent(href, row.link_body, row.link_apikey, json);
            results[href] = response;
        }
        // Преобразовываем объект results в строку JSON
        const resultsJSON = JSON.stringify(results);
        // Дожидаемся выполнения всех асинхронных вызовов
        // и результаты сохранены в объекте results
        await pgdb.query(`
        UPDATE incidents
        SET json = json || '{"sent": ${resultsJSON}}'
        WHERE id = ${id};`);
    }

    async selectAllStoragesInRadiusDirect(coord, current_radius){
        // Валидация входных координат
        if(!validateStrsService.validateCoords(coord))
            throw apiError.BadRequest('Неправильный формат координат');

        // Получение ближайших складов по прямой линии (за исключением уже найденных)
        let closestStoragesDirect = await storagesService.getClosestStorages(coord, 'coord', current_radius)
        return closestStoragesDirect
    }

    async distanseToStorageByRoad(coord, current_radius, findStoragesList, current_storages_list, distanseRoadMax){
        // Валидация входных координат
        if(!validateStrsService.validateCoords(coord))
            throw apiError.BadRequest('Неправильный формат координат');
        
        // Разделение координат входа
        const coordInp = coord.split('/');
        
        // Создаем массив идентификаторов складов, которые нужно исключить
        let not_to_look = []
        if(current_storages_list.length > 0)
            not_to_look = current_storages_list.map(storage => storage.id);

        // Фильтруем массив findStoragesList
        let filteredStoragesList = findStoragesList.filter(storage => {
            // Проверяем, что склад находится в пределах радиуса и его идентификатор не находится в списке not_to_look
            return storage.distanse <= current_radius && !not_to_look.includes(storage.id);
        });

        // Вычисление расстояния по дороге и обновление данных о складах
        for(let storeIndex in filteredStoragesList){
            const coordStorage = filteredStoragesList[storeIndex].coordsBD
            const distanseByRore = await geoService.calculateDistanceByRode(coordInp[0], coordInp[1], coordStorage[0], coordStorage[1])
            filteredStoragesList[storeIndex]['distanseByRoad'] = distanseByRore[0]
            filteredStoragesList[storeIndex]['rodeInfo'] = distanseByRore[1]
        }

        // Фильтрация складов по радиусу и сортировка по расстоянию
        // filteredStoragesList = filteredStoragesList.filter(storage => storage.distanseByRoad <= distanseRoadMax)
        filteredStoragesList.forEach(storage => {
            storage.within_length_road = storage.distanseByRoad <= distanseRoadMax;
        });
        filteredStoragesList.sort((a, b) => a.distanseByRoad - b.distanseByRoad)
        return filteredStoragesList
    }

    selectAllowedMinItems(incident, percent){
        let output = {}
        const incident_items = incident.items
        for(let item in incident_items){
            output[item] =  Math.ceil((incident_items[item] * (100 - percent)) / 100)
        }
        return output
    }




    async findStoragesWithNeedItems(findStoragesList, itemsListForIncident){
        const storageItemsMap = {};
        // Получение списка ID ближайших складов
        let closestStoragesId = findStoragesList.map(storage => storage.id);
        let itemsCodeNames = []
        
        for(const [key, value] of Object.entries(itemsListForIncident.need_items)){
            const itemsInStorages = await pgdb.query(`SELECT id FROM items WHERE name = $1`, [key])
            if(itemsInStorages.rowCount == 0){
                continue
            }
            itemsCodeNames.push(itemsInStorages.rows[0].id)
        }
        const closestStoragesIdSql = '(' + (closestStoragesId.length > 0 ? closestStoragesId.join(', ') : "-1") + ')';
        const itemsCodeNamesSql = '(' +  (itemsCodeNames.length > 0 ? itemsCodeNames.join(', ') : "-1") + ')';

        // Получение списка предметов на складах
        let itemsInStorages;
        const itemsInStoragesSqlOut = await pgdb.query(`
            SELECT items_in_storages.id as id, items_in_storages.item_id as item_id, items_in_storages.storage_id as storage_id, items_in_storages.count as count, items.name as item_name
            FROM items_in_storages
            left join items on items_in_storages.item_id = items.id
            WHERE items_in_storages.item_id IN ${itemsCodeNamesSql}
            AND items_in_storages.storage_id IN ${closestStoragesIdSql}
            AND items_in_storages.count > 0
        `);
        itemsInStorages = itemsInStoragesSqlOut.rows;
        for (const storageItem of itemsInStorages) {
            // Если склада еще нет в объекте storageItemsMap, добавляем его
            if (!storageItemsMap[storageItem.storage_id]) {
                storageItemsMap[storageItem.storage_id] = [];
            }

            // Добавляем предмет в массив для данного склада
            storageItemsMap[storageItem.storage_id].push({
                id: storageItem.id,
                item_id: storageItem.item_id,
                count: storageItem.count,
                item_name: storageItem.item_name
            });
        }
        // Добавляем массив предметов в каждый склад
        findStoragesList.forEach(storage => {
            storage["need_items_in_storage"] = storageItemsMap[storage.id] || [];
        });
        // Удаляем склады, у которых нет предметов
        findStoragesList = findStoragesList.filter(storage => storage.need_items_in_storage.length > 0);
        return findStoragesList
    }






    async getItemsFromStorages(itemsListForIncident, coord){
        // Получаем возможный процент погрешности
        const percentDb = await pgdb.query(`
        SELECT value
        FROM settings
        WHERE name = 'allowed_percentage_of_skipping_for_item';`)
        const percent = percentDb.rows[0].value;

        // Для каждого предмета в инцидентах в items_allowed_min ставим минимально возможное необходимое значение
        for(let incident in itemsListForIncident.need_items_by_incident){
            itemsListForIncident.need_items_by_incident[incident]["items_allowed_min"] = this.selectAllowedMinItems(itemsListForIncident.need_items_by_incident[incident], percent)
        }

        // Берём среднюю скорость автомобиля
        const viacle_avarge_speedDb = await pgdb.query(`
        SELECT value
        FROM settings
        WHERE name = 'viacle_avarge_speed';`)
        const viacle_avarge_speed = viacle_avarge_speedDb.rows[0].value;

        // Берём мультиплексер для максимального радиуса
        const max_radiusDb = await pgdb.query(`
        SELECT value
        FROM settings
        WHERE name = 'max_radius';`)

        // Берём мультиплексер для минимального радиуса
        let max_radius_multiplexser = parseFloat(max_radiusDb.rows[0].value);
        const min_radiusDb = await pgdb.query(`
        SELECT value
        FROM settings
        WHERE name = 'min_radius';`)

        // Фиксим мультиплексоры, если заданы с ошибками
        let min_radius_multiplexser = parseFloat(min_radiusDb.rows[0].value);
        if(max_radius_multiplexser <= 0)
            max_radius_multiplexser = 1
        if(min_radius_multiplexser <= 0)
            min_radius_multiplexser = 1
        if(max_radius_multiplexser < min_radius_multiplexser){
            const a = min_radius_multiplexser
            min_radius_multiplexser = max_radius_multiplexser
            max_radius_multiplexser = a
        }

        // Берём шаг изменения радиуса
        const radius_stepDb = await pgdb.query(`
        SELECT value
        FROM settings
        WHERE name = 'radius_step';`)
        const radius_step = Number(Math.ceil(radius_stepDb.rows[0].value));

        // Берём мультиплексер для дистанции по дороге
        const road_distanse_multiplexerDb = await pgdb.query(`
        SELECT value
        FROM settings
        WHERE name = 'road_distanse_multiplexer';`)
        const road_distanse_multiplexer = Number(road_distanse_multiplexerDb.rows[0].value);
        
        // Берём не более за 1 проход
        const percent_taken_from_warehouseDb = await pgdb.query(`
        SELECT value
        FROM settings
        WHERE name = 'percentage_taken_from_warehouse';`)
        const percent_taken_from_warehouse = percent_taken_from_warehouseDb.rows[0].value;
        

        const percentage_of_items_from_warehouse_to_cancel_delivery_for_incidentDb = await pgdb.query(`
            SELECT value
            FROM settings
            WHERE name = 'percentage_of_items_from_warehouse_to_cancel_delivery_for_incident';`)
        const percentage_of_items_from_warehouse_to_cancel_delivery_for_incident = percentage_of_items_from_warehouse_to_cancel_delivery_for_incidentDb.rows[0].value;

        // Функция для вычисления расстояния в метрах
        function calculateDistance(speedKmh, timeMinutes) {
            // Переводим скорость из км/ч в м/мин
            const speedMps = speedKmh * 1000 / 3600; // переводим км/ч в м/с
            const speedMpm = speedMps * 60; // переводим м/с в м/мин
        
            // Вычисляем расстояние
            const distanceMeters = speedMpm * timeMinutes;
        
            return Math.ceil(distanceMeters);
        }
        
        // let updateDbData = {}
        let allItemsGet = {}
        let incidentsData = {}
        let storagesData = {}
        // Идём по каждому инциденту отдельно
        for(const incident_index in itemsListForIncident.need_items_by_incident){
            let updateDbData = {}
            let incident = itemsListForIncident.need_items_by_incident[incident_index]
            let storagesDataForIncident = {}
            incidentsData["allItemsRequest"] = itemsListForIncident.need_items
            if(!incidentsData[incident_index])
                incidentsData[incident_index] = {}

            // Находим радиус поиска и его мин и макс значения
            const radius = calculateDistance(viacle_avarge_speed, incident.react_time)
            const min_radius = Math.ceil(radius * min_radius_multiplexser)
            const max_radius = Math.ceil(radius * max_radius_multiplexser)
            incidentsData[incident_index].radius = radius
            incidentsData[incident_index].min_radius = min_radius
            incidentsData[incident_index].max_radius = max_radius
            incidentsData[incident_index].react_time = incident.react_time
            let current_radius = min_radius
            let find_all = false
            let finale_move_flag = false

            // Находим склады с пределах максимального радиуса
            let findStoragesList = await this.selectAllStoragesInRadiusDirect(coord, max_radius)

            // Находим склады с нужными предметами, остальные отбрасываем (сохраняем предметы, что бы снова не обращаться)
            findStoragesList = await this.findStoragesWithNeedItems(findStoragesList, itemsListForIncident)
            const find_storages_count = findStoragesList.length
            let find_storages_count_act = 0
            let current_storages_list = []
            let count_items_in_storages = {}
            
            // Идём по радиусам (условие завершения: пройдены все радиусы, найдены все товары в пределах погрешности, прошли все найденные склады)
            while(current_radius <= max_radius && !find_all && find_storages_count > find_storages_count_act){
                // Находим новые склады с радиусе и добавляем к существующим
                const new_storages_list = await this.distanseToStorageByRoad(coord, current_radius, findStoragesList, current_storages_list, current_radius * road_distanse_multiplexer)
                current_storages_list = current_storages_list.concat(new_storages_list)
                find_storages_count_act = current_storages_list.length
                // Итерируемся по новым складам
                for (const new_storage of new_storages_list) {
                    // Итерируемся по каждому предмету в складе
                    for (const item of new_storage.need_items_in_storage) {
                        const { item_name, count } = item;
                        // Если предмет уже есть в count_items_in_storages, увеличиваем его количество, иначе создаем новую запись
                        if (count_items_in_storages.hasOwnProperty(item_name)) {
                            count_items_in_storages[item_name] += count;
                        } else {
                            count_items_in_storages[item_name] = count;
                        }
                    }
                }

                
                // Теперь проверяем условие с incident
                let allItemsSatisfied = true;
                for (const item_name in incident.items_allowed_min) {
                    if (incident.items_allowed_min.hasOwnProperty(item_name)) {
                        const requiredCount = incident.items_allowed_min[item_name];
                        const storedCount = count_items_in_storages[item_name] || 0;
                        if (storedCount < requiredCount) {
                            allItemsSatisfied = false;
                            break;
                        }
                    }
                }

                // Если все предметы удовлетворены, устанавливаем флаг find_all
                if (allItemsSatisfied) {
                    find_all = true;
                }
                current_radius += radius_step
                if(current_radius >= max_radius){
                    if(finale_move_flag){
                        current_radius += 1
                    }else{
                        current_radius = max_radius
                        finale_move_flag = true
                    }
                }
                
            }

            incident['itemsCount'] = {...incident.items}

            // поиск процента от числа с округлением в меньшую сторону
            function getPercentageAndRoundUp(number, percent) {
                let num = Math.floor(number * percent / 100);
                if (num == 0)
                    num = Math.ceil(number * percent / 100);
                return num
            }

            let findProcess = true
            let itemsGet = {}
            let lastAudit = []
            lastAudit = JSON.parse(JSON.stringify(incident.itemsCount));
            // Идём в несколько циклов
            while(findProcess){
                // Идём по складам
                for(let storageIndex in current_storages_list){
                    let storage = current_storages_list[storageIndex]
                    if(!storagesDataForIncident[storage.id]){
                        storagesDataForIncident[storage.id] = storage
                        storagesDataForIncident[storage.id].foundItems = {}
                    }
                    if(!updateDbData[storage.id])
                        updateDbData[storage.id] = {}
                    // Идём по предметам
                    for(let [itemName, itemValue] of Object.entries(incident.itemsCount)){
                        if(itemValue == 0)
                            continue;
                        
                        // Функция для поиска count по item_name
                        function getCountByItemName(storage, itemName) {
                            const item = storage.need_items_in_storage.find(item => item.item_name === itemName);
                            return [item ? item.count : -1, item ? item.item_id : -1];
                        }

                        // Если нашли предмет, то возвращаем его кол-во на складе и id
                        // const findItemInStorage = getCountByItemName(storage, itemName)
                        const itemIndex = storage.need_items_in_storage.findIndex(item => item.item_name === itemName);
                        if (itemIndex != -1) {
                            // находим сколько можно взять
                            const inStorage = getPercentageAndRoundUp(storage.need_items_in_storage[itemIndex].count, percent_taken_from_warehouse)
                            if(itemValue <= inStorage){
                                // Если в хранилище больше или равно, чем нужно
                                if(itemsGet[itemName])
                                    itemsGet[itemName] += itemValue
                                else
                                    itemsGet[itemName] = itemValue
                                if(allItemsGet[itemName])
                                    allItemsGet[itemName] += itemValue
                                else
                                    allItemsGet[itemName] = itemValue
                                if(updateDbData[storage.id][storage.need_items_in_storage[itemIndex].item_id])
                                    updateDbData[storage.id][storage.need_items_in_storage[itemIndex].item_id] += itemValue
                                else
                                    updateDbData[storage.id][storage.need_items_in_storage[itemIndex].item_id] = itemValue
                                if(storagesDataForIncident[storage.id].foundItems[itemName])
                                    storagesDataForIncident[storage.id].foundItems[itemName][0] += itemValue
                                else
                                    storagesDataForIncident[storage.id].foundItems[itemName] = [itemValue, 0]
                                storage.need_items_in_storage[itemIndex].count -= itemValue;
                                itemValue = 0
                                incident.itemsCount[itemName] = 0
                            }else{
                                // Если в хранилище меньше, чем нужно
                                if(itemsGet[itemName])
                                    itemsGet[itemName] += inStorage
                                else
                                    itemsGet[itemName] = inStorage
                                if(allItemsGet[itemName])
                                    allItemsGet[itemName] += inStorage
                                else
                                    allItemsGet[itemName] = inStorage
                                if(updateDbData[storage.id][storage.need_items_in_storage[itemIndex].item_id])
                                    updateDbData[storage.id][storage.need_items_in_storage[itemIndex].item_id] += inStorage
                                else
                                    updateDbData[storage.id][storage.need_items_in_storage[itemIndex].item_id] = inStorage
                                if(storagesDataForIncident[storage.id].foundItems[itemName])
                                    storagesDataForIncident[storage.id].foundItems[itemName][0] += inStorage
                                else
                                    storagesDataForIncident[storage.id].foundItems[itemName] = [inStorage, 0]
                                itemValue -= inStorage
                                incident.itemsCount[itemName] -= inStorage
                                storage.need_items_in_storage[itemIndex].count -= inStorage;
                            }
                        }
                    }
                }
                findProcess = false
                for(let [nameLeftToFind, valueLeftToFind] of Object.entries(incident.itemsCount)){
                    if(valueLeftToFind > 0 && itemsGet[nameLeftToFind] < incident.items_allowed_min[nameLeftToFind]){
                        findProcess = true
                    }
                }
                if (JSON.stringify(lastAudit) === JSON.stringify(incident.itemsCount)) {
                    findProcess = false;
                }
                lastAudit = JSON.parse(JSON.stringify(incident.itemsCount));
            }

            // Находим проценты для каждого предмета от всего необходимого количества
            for(let storage_id in storagesDataForIncident){
                storage_id = storage_id.toString()
                for (let found_idem_name in storagesDataForIncident[storage_id].foundItems){
                    storagesDataForIncident[storage_id].foundItems[found_idem_name][1] = Math.round((storagesDataForIncident[storage_id].foundItems[found_idem_name][0] / incident.items[found_idem_name]) * 100)
                }
            }

            // Убираем доставки с маленьким кол-во предметов
            for(let storage_id in storagesDataForIncident){
                storage_id = storage_id.toString()
                let skipPosibleDeleteFlag = false
                for (let found_idem_name in storagesDataForIncident[storage_id].foundItems){
                    if(storagesDataForIncident[storage_id].foundItems[found_idem_name][1] > percentage_of_items_from_warehouse_to_cancel_delivery_for_incident){ //!
                        // Если хотя бы 1 предмет больше константы, то не рассматриваем
                        skipPosibleDeleteFlag = true
                    }
                }
                if(skipPosibleDeleteFlag)
                    continue
                for (let found_idem_name in storagesDataForIncident[storage_id].foundItems){
                    if(itemsGet[found_idem_name] - storagesDataForIncident[storage_id].foundItems[found_idem_name][0] < incident.items_allowed_min[found_idem_name]){
                        skipPosibleDeleteFlag = true
                    }
                }
                if(skipPosibleDeleteFlag)
                    continue
                delete storagesDataForIncident[storage_id];
                delete updateDbData[storage_id];
            }

            let itemsInStorages = {}
            for(let storage_id in storagesDataForIncident){
                storage_id = storage_id.toString()
                itemsInStorages[storage_id] = {...storagesDataForIncident[storage_id].foundItems}
                if(!storagesData[storage_id]){
                    storagesData[storage_id] = storagesDataForIncident[storage_id]
                    for (let found_idem_name in storagesData[storage_id].foundItems){
                        storagesData[storage_id].foundItems[found_idem_name] = storagesData[storage_id].foundItems[found_idem_name][0]
                    }
                }else{
                    for (let found_idem_name in storagesData[storage_id].foundItems){
                        if(storagesDataForIncident[storage_id].foundItems[found_idem_name]){
                            storagesData[storage_id].foundItems[found_idem_name] += storagesDataForIncident[storage_id].foundItems[found_idem_name][0]
                        }
                    }
                }
                delete storagesData[storage_id].need_items_in_storage
            }



            incidentsData[incident_index].itemsData = JSON.parse(JSON.stringify(incident));
            delete incidentsData[incident_index].itemsData.react_time;
            // incidentsData[incident_index].itemsData.notFound = {}
            incidentsData[incident_index].itemsData.found = itemsGet
            incidentsData[incident_index].itemsData.itemsInStorages = itemsInStorages

            for (const key in incidentsData[incident_index].itemsData.itemsCount){
                if(incidentsData[incident_index].itemsData.itemsCount[key] > 0){
                    if(count_items_in_storages[key] < incidentsData[incident_index].itemsData.itemsCount[key]){
                        incidentsData[incident_index].itemsData.notFound[key] = incidentsData[incident_index].itemsData.itemsCount[key]
                    }
                }
            }

            delete incidentsData[incident_index].itemsData.itemsCount;

            for (let stor_id in updateDbData) {
                for (const item_id in updateDbData[stor_id.toString()]) {
                    const count = "count - " + updateDbData[stor_id.toString()][item_id.toString()];
                    await pgdb.query("UPDATE items_in_storages SET count = " + count + " WHERE item_id = $1 AND storage_id = $2", [item_id.toString(), stor_id.toString()]);
                }
            }


        }
        let coefData = {
            "percent_mistake": percent,
            "percent_taken_from_warehouse": percent_taken_from_warehouse,
            "viacle_avarge_speed": viacle_avarge_speed
        }
        
        await new Promise(resolve => setTimeout(resolve, 2000)); // Ожидание 10 секунд перед
        const reactReport = await this.madeReactReport(storagesData, incidentsData, allItemsGet, coefData)
        return reactReport
    }

    async madeReactReport(storagesData, incidentsData, allItemsGet, coefData){
        let report = {
            'storagesData': storagesData,
            'incidentsData' : incidentsData,
            'allItemsGet': allItemsGet,
            "coefData": coefData
        }
        report = JSON.stringify(report)
        return report
    }

    async getIncident(id, count, page, token){
        const decoded = tokenService.validateToken(token)
        count ? null : count = 10
        page ? null : page = 1
        let dialogaded = null
        let count_all = 0
        if(decoded.data.access == 2){
            // Только чтение
            'WHERE user_created = ' + decoded.data.id

            if(id != 'all')
                id = ' WHERE id = ' + id + " AND user_created = " + decoded.data.id
            else
                id = 'WHERE user_created = ' + decoded.data.id
            dialogaded = await pgdb.query("SELECT incidents.id, incidents.coord, incidents.json->'input_incident_information' AS json, incidents.date_created, incidents.time_created, users.login as user_created FROM incidents JOIN users ON incidents.user_created = users.user_id " + id + " order by id desc LIMIT $1 OFFSET $2", [count, count * (page - 1)])
            count_all = await pgdb.query("SELECT count(*) as count FROM incidents " + id)
        }else{
            if(id != 'all')
                id = ' WHERE id = ' + id
            else
                id = ''
            dialogaded = await pgdb.query('SELECT incidents.id, incidents.coord, incidents.json, incidents.date_created, incidents.time_created, users.login as user_created FROM incidents JOIN users ON incidents.user_created = users.user_id ' + id + " order by id desc LIMIT $1 OFFSET $2", [count, count * (page - 1)])
            count_all = await pgdb.query("SELECT count(*) as count FROM incidents " + id)
        }
        return [dialogaded.rows, count_all.rows[0].count]
    }

    async getTypes(){
        const dialogaded = await pgdb.query("SELECT id, name, code_name FROM patterns where type = 'reaction'")
        if (dialogaded.rowCount > 0){
            return dialogaded.rows
        }else
            return false
    }
    async getInputPattern(code_name){
        if(code_name == '')
            return false
        const dialogaded = await pgdb.query(`SELECT json->'pattern_input' AS pattern_input FROM patterns WHERE code_name = '${code_name}'`)
        if (dialogaded.rowCount == 1){
            const pattern_input_for_code_name = dialogaded.rows[0].pattern_input
            for (let inputKey in pattern_input_for_code_name){
                if (pattern_input_for_code_name[inputKey] == 'PATTERN_COMMON'){
                    const input_pattern_common_db = await pgdb.query(`
                    SELECT json->'pattern_input' AS pattern_input
                    FROM patterns
                    WHERE code_name = $1;`, [inputKey])
                    if(input_pattern_common_db.rowCount == 0)
                        throw apiError.BadRequest(`Не найден PATTERN_COMMON "${inputKey}", обратитесь к администратору`);
                    pattern_input_for_code_name[inputKey] = input_pattern_common_db.rows[0].pattern_input
                }
            }
            return pattern_input_for_code_name
        }else
            return false
    }
}

module.exports = new incidentsService();