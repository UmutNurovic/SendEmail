const router = require('express').Router();
const nodemailer = require("nodemailer");

router.get("/", (req, res) => {
    res.render('contanc',{layout:"layout/home.ejs"});
  });


router.post("/", (req, res) => {
    const outPutHtml = `
    <h2> Mail Details </h2>
    <ul>
    <li>Name: ${req.body.name}</li>
    <li>Company: ${req.body.company}</li>
    <li>email: ${req.body.email}</li>
    <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3> Message</h3>
    <p>${req.body.message}</p>
    `;
    async function main() {
        let testAccount = await nodemailer.createTestAccount();
      
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true, // true for 465, false for other ports
          auth: {
            user: "your email address",
            pass: "your email address password", // generated ethereal password
          },
        });
      
        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: '"Node Project contact from " <yodaw2155@gmail.com>', // sender address
          to: "node your email address", // list of receivers
          subject: "Pinkman", // Subject line
          text: "Hello world?", // plain text body
          html: outPutHtml
        });
      
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        res.redirect('/contact');
    }
      main().catch(console.error);
    
});


module.exports = router;