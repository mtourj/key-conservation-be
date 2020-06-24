const paymentrails = require('paymentrails');

module.exports = paymentrails.connect({
  key: process.env.PR_API_KEY,
  secret: process.env.PR_API_SECRET,
  environment: process.env.DB_ENV,
});
