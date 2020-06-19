const ManagementClient = require('auth0').ManagementClient;
const auth0 = new ManagementClient({
  domain: 'key-conservation.auth0.com',
  clientId: process.env.H0STN0okZqMk59Ww0GY0GoKN0BgymUk7,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  scope: 'read:users update:users delete:users',
});

const deleteFromAuth0 = async (sub) => {
  auth0
    .deleteUser({ id: sub })
    .then(function () {
      console.log('user successfully deleted');
    })
    .catch(function (err) {
      console.log(err);
    });
};

module.exports = deleteFromAuth0;
