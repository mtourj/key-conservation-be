require('dotenv').config();
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(
//   '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'
// );

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

const msg = {
  to: 'rasha@rasha.dev',
  from: 'rasha@fastmail.com',
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};

sgMail
  .send(msg)
  .then(() => console.log('send mail success'))
  .catch(console.log);

// module.exports = { sendApprovalMail, sendDenialMail, sgMail };
module.exports = sgMail;
