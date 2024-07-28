import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();


let transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'ahanda205@gmail.com',
        pass:process.env.PASS
    }
})

let mailOptions = {
    from:"ahanda205@gmail.com",
    to:"ahanda206@hotmail.com",
    subject:"Send Node Email Aug",
    text:"Hello from node code",
    html:"<b> Test Mail </b>"
}

transporter.sendMail(mailOptions,(err,info) => {
    if(err) console.log(err)
    else{
        console.log(`Email Sent: ${info.response}`)
    }
})