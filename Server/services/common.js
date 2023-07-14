const passport = require("passport");
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'dhruv.jain9100@gmail.com', // gmail
    pass: 'umpvaqlgxqlwgmbq', // pass
  },
});


exports.isAuth = (req,res,done) =>{
    return passport.authenticate('jwt');
}


exports.sanitizeUser = (user) => {
    return {id: user.id,role:user.role}
}

exports.cookieExtractor = function(req){
    var token= null;
    if(req && req.cookies){
        token = req.cookies['jwt'];
    }
    return token;
}

exports.sendMail = async function ({to, subject, text, html}){
    let info = await transporter.sendMail({
        from: '"DJ&Co" <coderdost@gmail.com>', // sender address
        to,
        subject,
        text,
        html
      });
    return info;  
}