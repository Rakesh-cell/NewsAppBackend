var _=require("lodash");

const nodemailer = require("nodemailer");


var config={
    host:'smtp.gmail.com',
    port:587,
    auth:{
        user:'rakm030@gmail.com',
        pass: 'pjnz gkrg pjte knuc'
    }
};
 
var transporter=nodemailer.createTransport(config);

var defaultMail={
    from: 'rakm030@gmail.com',
    text:'test test'
}

const send=(to,subject,html)=>{
    //use default setting
    mail=_.merge({html},defaultMail,to);


    transporter.sendMail(mail,function(error,info){
        if(error)return console.error(error);
        console.log("mail sent",info.response);
    })
}

module.exports = {
    send
}
