const nodemailer = require('nodemailer');
const senderEmail =  process.env.EMAIL_ADDRESS;
const senderPassword =  process.env.EMAIL_PASSWORD;
const emailService =process.env.EMAIL_SERVICE;


const transporter = nodemailer.createTransport({
  service:emailService,
  auth: {
    user: senderEmail,
    pass: senderPassword
  }
});

const sendEmail =(userEmail)=>{ 
  
  const mailOptions = {
    from: senderEmail,
    to: userEmail,
    subject: 'Welcome To Our App',
    text: 'We are happy to welcome you.'
  };

  transporter.sendMail(mailOptions, function(error, info){
  if (error) {console.log(error); return false;} 
  else {console.log('Email sent: ' + info.response); return true;}
});}

module.exports= sendEmail;