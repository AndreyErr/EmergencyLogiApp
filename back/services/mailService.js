const tokenService = require('./tokenService');
const pgdb = require('../pgdb');
const bcrypt = require('bcryptjs');
const apiError = require('../exceptions/apiError');
const nodemailer = require('nodemailer'); // Заменим оператор import на require

class MailService {

    constructor() {
        // Настройка транспортера для отправки электронной почты
        this.transporter = nodemailer.createTransport({
            host: 'smtp.yandex.ru',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS
            }
        });
    }

    async sendEmail(login, email, mail_title, mail_text){
        try {
            await this.transporter.sendMail({
              from: process.env.EMAIL, // Адрес отправителя
              to: email,   // Адрес получателя
              subject: `EmergencyLogiApp | ${mail_title}`,
              html: mail_text,
            });
            console.log("Сообщение отправлено на "+email)
            return("OK")
        
        } catch (error) {
            return(error)
        }
    }
    
}

module.exports = new MailService();
