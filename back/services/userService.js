const tokenService = require('../services/tokenService')
const pgdb = require('../pgdb')
const bcrypt = require('bcryptjs')
const apiError = require('../exceptions/apiError');
const validate = require('./validateStrsService');
const mail = require('./mailService');

class userService {
    
    async createUser(login, pass, status, access, type, name, email, phone, personal_data, user_add, token){
        // const reEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        // const reLogin = /^[a-z0-9]+$/i;
        // const rePass = /^[a-zA-Z0-9!@#$%^&*]+$/i;
        const decoded = tokenService.validateToken(token)
        if(!validate.validateLogin(login)){
            throw apiError.BadRequest('VALID_ERROR', `Ошибка валидации логина. Должны быть латинские символы в нижнем регистре и цифры или символ _ От 4 до 120 символов.`)
        }
        let candidate = await pgdb.query('SELECT user_id FROM users WHERE login = $1', [login])
        if(candidate.rowCount > 0){
            throw apiError.BadRequest('USER_EXIST', `Пользователь с логином "${login}" уже существует`)
        }
        if(!validate.validatePassword(pass)){
            throw apiError.BadRequest('VALID_ERROR', `Ошибка валидации пароля. Должны быть латинские символы и цифры или символы /!?+=- От 5 до 120 символов.`)
        }
        if(!validate.validateName(name)){
            throw apiError.BadRequest('VALID_ERROR', `Ошибка валидации названия. Должны быть русские/латинские символы и цифры или символы /!?+=- От 2 до 120 символов.`)
        }
        if(!validate.validateEmail(email)){
            throw apiError.BadRequest('VALID_ERROR', `Ошибка валидации почты.`)
        }
        let email_db = await pgdb.query('SELECT email FROM users WHERE email = $1', [email])
        if(email_db.rowCount > 0){
            throw apiError.BadRequest('USER_EXIST', `Пользователь с почтой "${email}" уже существует`)
        }
        if(!validate.validatePhone(phone)){
            throw apiError.BadRequest('VALID_ERROR', `Ошибка валидации телефона.`)
        }
        let phone_db = await pgdb.query('SELECT phone FROM users WHERE phone = $1', [phone])
        if(phone_db.rowCount > 0){
            throw apiError.BadRequest('USER_EXIST', `Пользователь с телефоном "${phone}" уже существует`)
        }
        if (isNaN(status)){
            throw apiError.BadRequest('VALID_ERROR', `Ошибка валидации статуса. Должно быть число.`)
        }
        if (isNaN(access)){
            throw apiError.BadRequest('VALID_ERROR', `Ошибка валидации доступа. Должно быть число.`)
        }
        if (isNaN(type)){
            throw apiError.BadRequest('VALID_ERROR', `Ошибка валидации типа. Должно быть число.`)
        }
        if (status < 0 || status > 2){ // 0 - бан, 1 - пользователь, ...
            throw apiError.BadRequest('VALID_ERROR', `Ошибка валидации статуса. Вне диапазона допустимых значений.`)
        }
        if (access < 0 || access > 3){ // 1 - добавление/чтение, 2 - добавление, 3 - чтение
            throw apiError.BadRequest('VALID_ERROR', `Ошибка валидации доступа. Вне диапазона допустимых значений.`)
        }
        if (type < 0 || type > 2){ // 1 - компания, 2 - персональный
            throw apiError.BadRequest('VALID_ERROR', `Ошибка валидации типа. Вне диапазона допустимых значений.`)
        }
        if(user_add == "me"){
            user_add = decoded.data.id
        }else{
            let user_add_db = await pgdb.query('SELECT user_id, status FROM users WHERE user_id = $1', [user_add])
            if(user_add_db.rowCount == 0){
                throw apiError.BadRequest('USER_EXIST', `Не найден ответственный пользователь`)
            }
            if(user_add_db.rows[0].status < 4){
                throw apiError.BadRequest('USER_EXIST', `Указанный ответственный пользователь не имеет такого права`)
            }
        }
        if(status >= decoded.data.status && decoded.data.login != UNBAN_LOGIN){
            throw apiError.BadRequest('NOT_CHANGE', `Нельзя установить такой статус`)
        }
        let check_type = ""
        if(type == 1)
            check_type = "inn"
        else
            check_type = "passport"
        if(!validate.validatePersonalData(personal_data, check_type)){
            throw apiError.BadRequest('VALID_ERROR', `Ошибка валидации персональных данных. Должен быть ИНН для компании или серия и номер паспорта для личности.`)
        }
        const hashPass = await bcrypt.hash(pass, 5)
        const new_id = await pgdb.query('INSERT INTO users (login, pass, status, access, type, personal_data, name, email, phone, user_add, flag) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 1) RETURNING *', [login, hashPass, status, access, type, personal_data, name, email, phone, user_add])
        // const tokens = tokenService.generateTokens({id: newPerson.rows[0]['user_id'], login: newPerson.rows[0]['login']})
        return ["OK", new_id.rows[0].user_id]
    }

    async loginUser(login, pass){
        if(!validate.validateLogin(login)){
            throw apiError.BadRequest('VALID_ERROR', `Ошибка валидации логина. Должны быть латинские символы в нижнем регистре и цифры или символ _ От 4 до 120 символов.`)
        }
        const candidate = await pgdb.query('SELECT * FROM users WHERE login = $1', [login])
        if(candidate.rowCount == 0){
            throw apiError.BadRequest('USER_NOT_EXIST', `Пользователь с логином ${login} не существует`)
        }
        if(candidate.rows[0].status == 1){
            throw apiError.BadRequest('USER_BLOCK', `Пользователь с логином ${login} заблокирован`)
        }
        if(!validate.validatePassword(pass)){
            throw apiError.BadRequest('VALID_ERROR', `Ошибка валидации пароля. Должны быть латинские символы и цифры или символы /!?+=- От 5 до 120 символов.`)
        }
        const isPassEquals = await bcrypt.compare(pass, candidate.rows[0]['pass'].trim())
        if(!isPassEquals){
            throw apiError.BadRequest('WRONG_PASS', `Неверный пароль`)
        }
        const tokens = tokenService.generateTokens({id: candidate.rows[0]['user_id'], login: candidate.rows[0]['login'], email: candidate.rows[0]['email'], status: candidate.rows[0]['status'], name: candidate.rows[0]['name'], flag: candidate.rows[0]['flag'], access: candidate.rows[0]['access']})
        return {
            ...tokens
        };
    }

    async editUser(login, status, access, type, name, email, phone, personal_data, edit_type, user_add, token){
        const decoded = tokenService.validateToken(token)
        let UNBAN_LOGIN = await pgdb.query("SELECT value FROM settings WHERE name = 'main_administrator'")
        UNBAN_LOGIN = UNBAN_LOGIN.rows[0]['value']
        if(!validate.validateName(name)){
            throw apiError.BadRequest('VALID_ERROR', `Ошибка валидации названия. Должны быть русские/латинские символы и цифры или символы /!?+=- От 2 до 120 символов.`)
        }
        if(!validate.validateEmail(email)){
            throw apiError.BadRequest('VALID_ERROR', `Ошибка валидации почты.`)
        }
        let email_db = await pgdb.query('SELECT email FROM users WHERE email = $1 and login != $2', [email, login])
        if(email_db.rowCount > 0){
            throw apiError.BadRequest('USER_EXIST', `Пользователь с почтой "${email}" уже существует`)
        }
        let user_edited_id = await pgdb.query('SELECT user_id, status, user_add, access FROM users WHERE login = $1', [login])
        const user_add_db_edited = user_edited_id.rows[0].user_add
        user_edited_id = [user_edited_id.rows[0].user_id, user_edited_id.rows[0].status, user_edited_id.rows[0].access]
        if(edit_type == "edit"){
            if(decoded.data.status < 2){
                throw apiError.BadRequest('ACCESS_ERROR', `Доступ к изменению "${login}" запрещён`)
            }
            if(decoded.data.id != user_edited_id[0]){
                if(decoded.data.status <= user_edited_id[1] && decoded.data.login != UNBAN_LOGIN){
                    throw apiError.BadRequest('ACCESS_ERROR', `Доступ к изменению "${login}" запрещён`)
                }
            }
            if(!validate.validatePhone(phone)){
                throw apiError.BadRequest('VALID_ERROR', `Ошибка валидации телефона.`)
            }
            let phone_db = await pgdb.query('SELECT phone FROM users WHERE phone = $1 and login != $2', [phone, login])
            if(phone_db.rowCount > 0){
                throw apiError.BadRequest('USER_EXIST', `Пользователь с телефоном "${phone}" уже существует`)
            }
            if (isNaN(access)){
                throw apiError.BadRequest('VALID_ERROR', `Ошибка валидации доступа. Должно быть число.`)
            }
            if(decoded.data.id != user_edited_id[0] || decoded.data.login != UNBAN_LOGIN){
                if (access < 0 || access > 3){ // 1 - добавление/чтение, 2 - добавление, 3 - чтение
                    throw apiError.BadRequest('VALID_ERROR', `Ошибка валидации доступа. Вне диапазона допустимых значений.`)
                }
            }else{
                access = user_edited_id[3]
            }
            if (type < 0 || type > 2){ // 1 - компания, 2 - персональный
                throw apiError.BadRequest('VALID_ERROR', `Ошибка валидации типа. Вне диапазона допустимых значений.`)
            }
            if(decoded.data.status > 3){
                if(user_add == "me"){
                    user_add = decoded.data.id
                }else{
                    let user_add_db = await pgdb.query('SELECT status FROM users WHERE user_id = $1', [user_add])
                    if(user_add_db.rowCount == 0){
                        throw apiError.BadRequest('USER_EXIST', `Не найден ответственный пользователь`)
                    }
                    if(user_add_db.rows[0].status < 3){
                        throw apiError.BadRequest('USER_EXIST', `Указанный ответственный пользователь не имеет такого права`)
                    }
                }
            }else{
                user_add = user_add_db_edited
            }
        }else{
            let user_type = await pgdb.query('SELECT type FROM users WHERE login = $1', [login])
            type = user_type.rows[0].type
        }
        let check_type = ""
        if(type == 1)
            check_type = "inn"
        else
            check_type = "passport"
        if(!validate.validatePersonalData(personal_data, check_type)){
            throw apiError.BadRequest('VALID_ERROR', `Ошибка валидации персональных данных. Должен быть ИНН для компании или серия и номер паспорта для личности.`)
        }
        if(decoded.data.access != 2 && access == 2){
            await pgdb.query('UPDATE external_links SET link_status = 2 where link_creator = $1 and link_status != 3', [user_edited_id[0]])
        }
        let id = null
        if(edit_type == "edit"){
            id = await pgdb.query('UPDATE users SET access = $1, personal_data = $2, name = $3, email = $4, phone = $5, user_add = $7 where login = $6 RETURNING *', [access, personal_data, name, email, phone, login, user_add])
        }else{
            id = await pgdb.query('UPDATE users SET name = $1, email = $2 where login = $3 RETURNING *', [name, email, login])
        }
            // const tokens = tokenService.generateTokens({id: newPerson.rows[0]['user_id'], login: newPerson.rows[0]['login']})
        return ["OK", id.rows[0].user_id]
    }

    async editPass(login, email, name, old_pass, pass, type, token){
        const decoded = tokenService.validateToken(token)
        function generatePassword() {
            const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
            const digits = '0123456789';
            const symbols = '/!?+=-';
        
            const allCharacters = uppercaseLetters + lowercaseLetters + digits + symbols;
        
            // Генерация случайного целого числа в заданном диапазоне
            function getRandomInt(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
        
            // Выбор случайного символа из строки
            function getRandomCharacter(characters) {
                return characters.charAt(getRandomInt(0, characters.length - 1));
            }
        
            // Генерация пароля
            function generateRandomPassword() {
                const length = getRandomInt(5, 15);
                let password = '';
        
                // Добавление обязательных символов
                password += getRandomCharacter(uppercaseLetters); // Заглавная буква
                password += getRandomCharacter(lowercaseLetters); // Строчная буква
                password += getRandomCharacter(digits); // Цифра
                password += getRandomCharacter(symbols); // Символ
        
                // Добавление остальных символов
                for (let i = 4; i < length; i++) {
                    password += getRandomCharacter(allCharacters);
                }
        
                // Перемешивание пароля
                password = password.split('').sort(() => Math.random() - 0.5).join('');
        
                return password;
            }
            return generateRandomPassword()
        }
        if(type == "user_me"){
            const candidate = await pgdb.query('SELECT pass FROM users WHERE login = $1', [login])
            const isPassEquals = await bcrypt.compare(old_pass, candidate.rows[0]['pass'].trim())
            if(!isPassEquals){
                throw apiError.BadRequest('WRONG_PASS', `Неверный старый пароль`)
            }
        }
        if(type == "admin_set"){
            if(!validate.validateLogin(login)){
                throw apiError.BadRequest('VALID_ERROR', `Ошибка валидации логина. Должны быть латинские символы в нижнем регистре и цифры или символ _ От 4 до 120 символов.`)
            }
            let candidate = await pgdb.query('SELECT user_id FROM users WHERE login = $1', [login])
            if(candidate.rowCount == 0){
                throw apiError.BadRequest('USER_EXIST', `Пользователь с логином "${login}" не найден`)
            }
        }else{
            login = decoded.data.login
            // const candidate = await pgdb.query('SELECT flag FROM users WHERE login = $1', [login])
            // if(candidate.rows[0].flag != 1){
            //     throw apiError.BadRequest('DENIDE', `Замена пароля не разрешена`)
            // }
        }
        if(pass){
            if(type == "admin_set" && decoded.data.status != 5){
                throw apiError.BadRequest('ACCESS_ERROR', `Ошибка доступа.`)
            }
            if(!validate.validatePassword(pass)){
                throw apiError.BadRequest('VALID_ERROR', `Ошибка валидации пароля. Должны быть латинские символы и цифры или символы /!?+=- От 5 до 120 символов.`)
            }
        }else{
            pass = generatePassword()
        }

        const hashPass = await bcrypt.hash(pass, 5)
        const mail_title = "Изменение пароля на аккаунте " + login
        let mail_text = ""
        if(type == "admin_set"){
            mail_text = `<p>Добрый день, ${name}</p><p>На вашем аккаунте ${login} был сброшен пароль! Временный пароль: <strong>${pass}</strong> . Вам придётся изменить его на свой при новом входе в нашу систему.</p>`
        }else{
            mail_text = `<p>Добрый день, ${name}</p><p>На вашем аккаунте ${login} был установлен новый пароль!</p>`
        }
        mail.sendEmail(login, email, mail_title, mail_text);
        if(type == "admin_set")
            await pgdb.query('UPDATE users SET pass = $2, flag = 1 WHERE login = $1 RETURNING *', [login, hashPass])
        else
            await pgdb.query('UPDATE users SET pass = $2, flag = 0 WHERE login = $1 RETURNING *', [login, hashPass])
        // const tokens = tokenService.generateTokens({id: newPerson.rows[0]['user_id'], login: newPerson.rows[0]['login']})
        return "OK"
    }

    async checkToken(data){
        const candidate = await pgdb.query('SELECT * FROM users WHERE user_id = $1', [data.id])
        if(candidate.rowCount > 0){
            const tokens = tokenService.generateTokens({id: data.id, login: data.login, email: data.email, status: candidate.rows[0]['status'], name: candidate.rows[0]['name'], flag: candidate.rows[0]['flag'], access: candidate.rows[0]['access']})
            return tokens
        }
    }

    async getFilterStr(filter, decoded_token){
        const decoded = decoded_token
        let filter_str = ''
        if(![4, 5].includes(decoded.data.status)){
            filter = 'me'
        }
        if(filter != 'all'){
            if(filter == 'me'){
                filter = decoded.data.id
            } else {
                const user = await pgdb.query('SELECT user_id FROM users where user_id = $1', [filter])
                if(user.rowCount == 0){
                    throw apiError.BadRequest('VALID_ERROR', `Не найден пользователь.`)
                }
            }
            filter_str = 'WHERE users.user_add = ' + filter
        } else {
            if([4].includes(decoded.data.status)){
                filter_str = 'WHERE users.status < 5'
            }
        }
        return filter_str
    }

    async getDependsAndMyId(id) {
    // Определяем рекурсивную CTE (общее таблице выражение)
    const recursiveQuery = `
        WITH RECURSIVE dependent_users AS (
            SELECT user_id FROM users WHERE user_add = $1 or user_id = $1
            UNION ALL
            SELECT u.user_id FROM users u JOIN dependent_users d ON u.user_add = d.user_id
        )
        SELECT user_id FROM dependent_users;
    `;
    // Выполняем запрос с параметром id
    const dependentUsers = await pgdb.query(recursiveQuery, [id]);
    const dependentUserIds = dependentUsers.rows.map(user => user.user_id);
    return dependentUserIds;
    }

    async getUser(token){
        const decoded = tokenService.validateToken(token);
        const user = await pgdb.query(`SELECT users.user_id AS user_id, users.email AS email, users.type AS type, users.login AS login, users.name AS name, users.personal_data AS personal_data, users.phone AS phone, users.status AS status, statuses.title AS status_text, created_users.login AS login_created FROM users JOIN statuses ON users.status = statuses.status_id JOIN users AS created_users ON users.user_add = created_users.user_id WHERE users.login = $1;`, [decoded.data.login]);
        return user.rows[0]
    }

    async selectUsers(count, page, filter, token){
        const decoded = tokenService.validateToken(token);
        let filter_str = await this.getFilterStr(filter, decoded);
        let out_users = null;
        let usersAdmins = null;
        if([3, 4].includes(decoded.data.status)){
            const dependentUserIds = await this.getDependsAndMyId(decoded.data.id);
            let addon_filter_str_sql = '';
            let addon_filter_str = `users.user_add = ANY($1) or users.user_id = $2`;
            if(filter_str == ""){
                addon_filter_str_sql = "WHERE " + addon_filter_str;
            } else {
                addon_filter_str_sql = " AND " + addon_filter_str;
            }
            const users = await pgdb.query(`SELECT users.*, statuses.title AS status_text, created_users.login AS login_created FROM users JOIN statuses ON users.status = statuses.status_id JOIN users AS created_users ON users.user_add = created_users.user_id ${filter_str} ${addon_filter_str_sql} ORDER BY statuses.status_id DESC, users.user_id DESC LIMIT $3 OFFSET $4;`, [dependentUserIds, decoded.data.id, count, count * (page - 1)]);
    
            // Получить список пользователей, зависимых от найденных в первом пункте
            const dependentOfDependentUsers = await pgdb.query(`SELECT user_id, login FROM users WHERE ${addon_filter_str} and status > 2`, [dependentUserIds, decoded.data.id]);
            usersAdmins = dependentOfDependentUsers.rows;
    
            // Добавить зависимых пользователей к основному списку пользователей
            out_users = [users.rows, usersAdmins];
        } else {
            const users = await pgdb.query(`SELECT users.*, statuses.title AS status_text, created_users.login AS login_created FROM users JOIN statuses ON users.status = statuses.status_id JOIN users AS created_users ON users.user_add = created_users.user_id ${filter_str} ORDER BY statuses.status_id DESC, users.user_id DESC LIMIT $1 OFFSET $2;`, [count, count * (page - 1)]);
            if([5].includes(decoded.data.status)){
                usersAdmins = await pgdb.query(`SELECT user_id, login from users where status > 2;`);
                usersAdmins = usersAdmins.rows;
            }
            out_users = [users.rows, usersAdmins];
        }
        return out_users;
    }  

    async countAllUsers(filter, token){
        const decoded = tokenService.validateToken(token)
        let filter_str = await this.getFilterStr(filter, decoded)
        const users = await pgdb.query(`SELECT COUNT(user_id) AS count FROM users ${filter_str}`)
        return users.rows[0]['count']
    }

    async searchUser(str, limit, token){
        const decoded = tokenService.validateToken(token);
        let text_where = '';
        let param_array = [];
        if(decoded.data.status < 5){
            const dependentUserIds = await this.getDependsAndMyId(decoded.data.id);
            text_where = "AND (users.user_add = ANY($3) OR users.user_id = $4) AND users.status < 5";
            param_array = ['%'+str+'%', limit, dependentUserIds, decoded.data.id];
        } else {
            text_where = ''; // не добавляем дополнительное условие для статуса 5
            param_array = ['%'+str+'%', limit];
        }
        const exit = await pgdb.query(`
            SELECT users.*, statuses.title AS status_text, created_users.login AS login_created 
            FROM users 
            JOIN statuses ON users.status = statuses.status_id 
            JOIN users AS created_users ON users.user_add = created_users.user_id 
            WHERE (lower(users.login) LIKE lower($1) OR lower(users.email) LIKE lower($1)) ${text_where} 
            ORDER BY users.status DESC, users.user_id DESC 
            LIMIT $2
        `, param_array);
        if (exit.rowCount > 0){
            return exit.rows;
        } else {
            return 'null';
        }
    }
    

    async selectUsersTypes(){
        const statuses = await pgdb.query('SELECT * FROM statuses')
        return statuses.rows
    }

    async checkStatus(id, status){
        const stat = await pgdb.query('SELECT status FROM users WHERE user_id = $1', [id])
        if(stat.rowCount !== 0){
            if(stat.rows[0]['status'] == status){
                return [true, stat.rows[0]['status']]
            }else{
                return [false, stat.rows[0]['status']]
            }
        }else{
            return 'ERR'
        }
    }

    async updateUserStatus(id, status, token){
        const decoded = tokenService.validateToken(token)
        let updatedUser = await pgdb.query('SELECT status, login FROM users WHERE user_id = $1', [id])
        let UNBAN_LOGIN = await pgdb.query("SELECT value FROM settings WHERE name = 'main_administrator'")
        UNBAN_LOGIN = UNBAN_LOGIN.rows[0]['value']
        if(updatedUser.rows[0]['login'] == UNBAN_LOGIN || (updatedUser.rows[0]['status'] == 5 && decoded.data.login != UNBAN_LOGIN) || decoded.data.status < 3 || (decoded.data.status <= updatedUser.rows[0]['status']  && decoded.data.login != UNBAN_LOGIN)){
            throw apiError.BadRequest('NOT_CHANGE', `Изменение запрещено`)
        }
        if(status >= decoded.data.status && decoded.data.login != UNBAN_LOGIN){
            throw apiError.BadRequest('NOT_CHANGE', `Нельзя установить такой статус`)
        }
        if(status < 3 && updatedUser.rows[0]['status'] >= 3){
            await pgdb.query('UPDATE users SET user_add = $1 WHERE user_add = $2', [decoded.data.id, id])
        }
        await pgdb.query('UPDATE users SET status = $1 WHERE user_id = $2', [status, id])
        return ["OK"]
    }

    // async logoutUser(accessToken){
    //     const token = await tokenService.deleteToken(accessToken)
    //     return token;
    // }
}

module.exports = new userService();