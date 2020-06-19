require('dotenv').config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const sendApprovalMail = (user_email) => {
  const msg = {
    to: user_email,
    from: 'rasha@fastmail.com',
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
  sgMail
    .send(msg)
    .then(() => console.log('send mail success'))
    .catch(console.log);
};
const sendDenialMail = (user_email) => {
  const msg = {
    to: user_email,
    from: 'rasha@fastmail.com',
    subject: 'NO POTATO',
    text: 'Your application has been denied.',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
  sgMail
    .send(msg)
    .then(() => console.log('send mail success'))
    .catch(console.log);
};

module.exports = { sendApprovalMail, sendDenialMail };
