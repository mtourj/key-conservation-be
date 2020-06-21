const db = require('../dbConfig');
const Vetting = require('../models/vettingModel');
const log = require('../../logger');

// copies user to denied_users table and deletes them from vetting table
const denyUser = async (sub) => {
  const user = await findVettingUserBySub(sub);
  const deniedUserId = await db('denied_users').insert(user);
  await Vetting.deleteUser(sub);
  return deniedUserId;
};

const findDeniedUsers = async () => {
  db('denied_users');
};

const findDeniedUserBySub = async (sub) => {
  const user = await db('denied_users').where({ sub }).first();
  return user;
};

module.exports = {
  denyUser,
  findDeniedUserBySub,
  findDeniedUsers,
};
