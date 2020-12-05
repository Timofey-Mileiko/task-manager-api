const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'mill.timofey@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendEmailOnCancellation = (email, name) => {
    sgMail.send({
        to: email,
        from: 'mill.timofey@gmail.com',
        subject: 'Deleting account',
        text: `If we can do something for you ${name}, let own now!:(`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendEmailOnCancellation
}