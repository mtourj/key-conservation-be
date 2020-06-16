const ManagementClient = require('auth0').ManagementClient;
const auth0 = new ManagementClient({
  domain: 'key-conservation.auth0.com',
  clientId: 'H0STN0okZqMk59Ww0GY0GoKN0BgymUk7',
  clientSecret:
    'sfkjf5g6lsLJ-d_kjZgIA_qtu5PAi8ib-MfbvHEQyWT7Xo-Uyk4g_Ko4rEdSVy95',
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
