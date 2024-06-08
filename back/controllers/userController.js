const userS = require('../services/userService')
const {validationResult} = require('express-validator')
const apiError = require('../exceptions/apiError')

class UserController {

    async createUser(req, res, next){
        try{
            const {login, pass, status, access, type, name, email, phone, user_add, personal_data} = req.body
            const token = req.headers.authorization.split(' ')[1]
            const newPerson = await userS.createUser(login, pass, status, access, type, name, email, phone, personal_data, user_add, token)
            res.json(newPerson)
        } catch (e) {
            next(e);
        }
    }

    async editUser(req, res, next){
        try{
            const {login, status, access, type, name, email, phone, personal_data, user_add, edit_type} = req.body
            const token = req.headers.authorization.split(' ')[1]
            const newPerson = await userS.editUser(login, status, access, type, name, email, phone, personal_data, edit_type, user_add, token)
            res.json(newPerson)
        } catch (e) {
            next(e);
        }
    }

    async editPass(req, res, next){
        try{
            const {login, email, name, old_pass, pass, type} = req.body
            const token = req.headers.authorization.split(' ')[1]
            const newPerson = await userS.editPass(login, email, name, old_pass, pass, type, token)
            res.json(newPerson)
        } catch (e) {
            next(e);
        }
    }

    async loginUser(req, res, next){
        try{
            const {login, pass} = req.body
            const loginPerson = await userS.loginUser(login, pass)
            res.json(loginPerson)
        } catch (e) {
            next(e);
        }
    }

    async selectUsers(req, res, next){
        try{
            let data = []
            const token = req.headers.authorization.split(' ')[1]
            data[0] = await userS.selectUsers(req.query.limit, req.query.page, req.query.filter, token)
            data[1] = await userS.countAllUsers(req.query.filter, token)
            res.json(data)
        }catch(e){
            next(e);
        }
    }

    async getUser(req, res, next){
        try{
            let data = []
            const token = req.headers.authorization.split(' ')[1]
            data = await userS.getUser(token)
            res.json(data)
        }catch(e){
            next(e);
        }
    }

    async searchUser(req, res, next){
        try{
            const str = req.query.str
            const limit = req.query.limit
            const token = req.headers.authorization.split(' ')[1]
            const result = await userS.searchUser(str, limit, token)
            res.json(result)
        } catch (e) {
            next(e);
        }
    }

    async selectUsersTypes(req, res, next){
        try{
            const ans = await userS.selectUsersTypes()
            res.json(ans)
        }catch(e){
            next(e);
        }
    }

    async updateUserStatus(req, res, next){
        try{
            const token = req.headers.authorization.split(' ')[1]
            const {id, status} = req.body
            const ans = await userS.updateUserStatus(id, status, token)
            res.json(ans)
        }catch(e){
            next(e);
        }
    }

    async check(req, res, next){
        const {data} = req.user
        const token = await userS.checkToken(data)
        res.json(token)
    }
}

module.exports = new UserController()