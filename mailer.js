var nodemailer = require('nodemailer');
var config = require('config');
var mailConfig = config.get("mailConfig");

var transporter = nodemailer.createTransport({
    service: mailConfig.service,
    auth: {
        user: mailConfig.username,
        pass: mailConfig.password
    }
});


function sendMail(toEmail, subject, html, cb) {
    var mailOptions = {
        from: 'aapavani.env.solns@gmail.com',
        to: toEmail,
        subject: subject,
        html: html
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            cb(error);
        } else {
            console.log('Email sent: ' + info.response);
            cb(null)
        }
    });
}

module.exports = sendMail

