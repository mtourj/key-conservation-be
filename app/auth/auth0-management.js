const { ManagementClient } = require('auth0');

const auth0 = new ManagementClient({
  domain: 'key-conservation.auth0.com',
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  scope: 'read:users update:users delete:users',
});

const deleteFromAuth0 = async (sub) => {
  auth0
    .deleteUser({ id: sub })
    .then(() => {
      // console.log('user successfully deleted');
    })
    .catch((err) => {
      // console.log(err);
    });
};

module.exports = deleteFromAuth0;
