const tokenService = require('./tokenService')
const pgdb = require('../pgdb')
const bcrypt = require('bcryptjs')
const apiError = require('../exceptions/apiError')

class validateStrsService {
    
    validateCoords(str) {
        const regex = /^\d+\.\d+\/\d+\.\d+$/;
        return regex.test(str);
    }

    validateLogin(str) {
        const regex = /^(?=.*[a-zA-Z].*[a-zA-Z])[a-zA-Z0-9_]{4,120}$/;
        return regex.test(str);
    }

    validatePassword(str) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\/!?+=\-]).{5,120}$/;
        return regex.test(str);
    }

    validateName(str) {
        const regex = /^[a-zA-Zа-яА-Я0-9\s\/!?+=\-]{2,120}$/;
        return regex.test(str);
    }

    validateEmail(str) {
        const regex = /^[^\s@]{1,40}@[^\s@]{1,20}\.[^\s@]{1,10}$/;
        return regex.test(str);
    }

    validatePhone(str) {
        const regex = /^(?:[0-9] ?){6,14}[0-9]$/;
        return regex.test(str);
    }

    validatePersonalData(str, type) {
        let regex = /^\d{12}$/;
        if(type == "inn"){
            regex = /^\d{12}$/;
        }else if(type == "passport"){
            regex = /^\d{4},\d{6}$/;
        }else{
            return false
        }
        return regex.test(str);
    }

    validate(str) {
        const regex = /^[a-zA-Zа-яА-Я0-9\s\/!?+=\-]{2,120}$/;
        return regex.test(str);
    }

    validateString(str, characteristics, limits) {
        const [minLength, maxLength] = limits;
    
        if (minLength > maxLength) {
            throw new Error('Административная ошибка лимитов, обратитесь к администратору');
        }
    
        const patterns = {
            'E': 'A-Z',
            'R': 'А-Я',
            'e': 'a-z',
            'r': 'а-я',
            'n': '0-9',
            's': '\\/!?+=:\\-*. _,', // экранируем символ "-"
            'p': ' ' // добавляем паттерн для пробела
        };
    
        let regexParts = characteristics.map(char => patterns[char]).join('');
        let regexStr = `^[${regexParts}]{${minLength},${maxLength}}$`;
    
        // Если среди характеристик есть 'n' и это единственная характеристика, позволяем любое количество цифр
        if (characteristics.includes('n') && characteristics.length === 1) {
            regexStr = `^[0-9]{${minLength},${maxLength}}$`;
        }
    
        let regex = new RegExp(regexStr);
    
        const result = regex.test(str);
        return result;
    }
    
    

}

module.exports = new validateStrsService();