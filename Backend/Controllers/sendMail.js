const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config()

const transport = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : process.env.user,
        pass :process.env.pass
    }
})

const sendMail = async(email,subject,content) => {
    
    const info = {
        from :process.env.user,
        to : email,
        subject : subject,
        html : content
    }

    await transport.sendMail(info)
}

module.exports = sendMail 