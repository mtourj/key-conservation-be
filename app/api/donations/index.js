const express = require('express');

const router = express.Router();

const crypto = require('crypto');

// const db = require('../../database/dbConfig');
const Users = require('../../database/models/usersModel');

// const PaymentRails = require('../../../util/paymentrails');
// const pick = require('../../../util/pick');

router.get('/accounts', async (req, res) => {
  const { sub } = req.user;

  try {
    const user = await Users.findBySub(sub);

    /*
    ==========================
    PAYMENT RAILS WIDGET START
    ==========================
*/

    const KEY = process.env.PR_API_KEY;
    const SECRET = process.env.PR_SECRET;

    // const recipientAddress = {
    //   // Adding addr. fields is optional. Used to easily populate
    //   firstName: "firstName", // the widget with default values.
    //   lastName: "lastName",
    //   governmentId: "governmentId",
    //   street1: "street1",
    //   street2: "street2",
    //   city: "city",
    //   postalCode: "postalCode",
    //   region: "AL",
    //   country: "US",
    // };

    const widgetBaseUrl = new URL('https://widget.paymentrails.com');
    const querystring = new URLSearchParams({
      ts: Math.floor(new Date().getTime() / 1000),
      key: KEY,
      email: user.email,
      refid: sub,
      hideEmail: 'false', // optional parameter: if 'true', hides the email field
      roEmail: 'false', // optional parameter: if 'true', renders the email field as Read Only
      payoutMethods: 'bank-transfer,paypal', // optional parameter: filters the possible payout methods shown on the widget
      locale: 'en', // optional parameter: ISO 639-1 language code, changes the language of the widget
      /*
      ** Adding address fields is optional, Used to easily populate
      ** the widget with default values.
      **
      'addr.firstName' : recipientAddress.firstName,
      'addr.lastName': recipientAddress.lastName,
      'addr.governmentId': recipientAddress.governmentId,
      'addr.street1': recipientAddress.street1,
      'addr.street2': recipientAddress.street2,
      'addr.city': recipientAddress.city,
      'addr.postalCode': recipientAddress.postalCode,
      'addr.region': recipientAddress.region,
      'addr.country': recipientAddress.country,
      */
      /*
     ** Adding color fields is also optional, used to override the
     ** color settings set in the dashboard. Note that these overrides must
     ** be valid CSS compatible colors.
     **
     'colors.heading': '#111111',
     'colors.inputText': '#222222',
     'colors.inputBorder': '#333333',
     'colors.text': '#555555',
     'colors.subText': '#666666',
     'colors.background': '#777777',
     'colors.primary': 'red',
     'colors.border': 'blue',
     'colors.success': '#AAAAAA',
     'colors.error': '#BBBBBB',
     'colors.warning': '#CCCCCC',
     */
    }).toString();

    const hmac = crypto.createHmac('sha256', SECRET);
    hmac.update(querystring);
    const signature = hmac.digest('hex');
    widgetBaseUrl.search = `${querystring}&sign=${signature}`;

    /*
    ==========================
    PAYMENT RAILS WIDGET END
    ==========================
*/

    return res.status(200).json({
      widget: widgetBaseUrl.toString(),
    });
  } catch (err) {
    return res.status(500).json({
      message:
        "An internal server occurred while trying to retrieve this user's payment accounts",
    });
  }
});

module.exports = router;
