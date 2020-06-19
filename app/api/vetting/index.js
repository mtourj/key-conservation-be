const express = require('express');
const router = express.Router();
const log = require('../../logger');
const S3Upload = require('../../middleware/s3Upload');
const sendApprovalMail = require('../../../util/sendgrid');
const sendDenialMail = require('../../../util/sendgrid');
const deleteFromAuth0 = require('../../auth/auth0-management');

const Vetting = require('../../database/models/vettingModel');
const Users = require('../../database/models/usersModel');

router.get('/', async (req, res) => {
  const allUsers = await Vetting.findAll();
  try {
    if (allUsers) {
      return res.status(200).json(allUsers);
    } else {
      return res.status(404).json({ message: 'No users in vetting database' });
    }
  } catch (error) {
    log.error(error);
    return res.status(500).json({ message: error.message, error });
  }
});

// Check vetting status with user sub
router.get('/:sub', async (req, res) => {
  const { sub } = req.params;
  console.log('sub from vetting endpoint', sub);
  try {
    const vettingUser = await Vetting.findVettingUserBySub(sub);
    if (vettingUser) {
      console.log('vetting user from get vetting status endpoint', vettingUser);
      return res.status(200).json({
        approvalStatus: 'Pending',
        message: 'The user has not yet been verified',
      });
    } else {
      const newUser = await Users.findBySub(sub);
      if (newUser) {
        console.log('newUser', newUser);
        return res.status(200).json({
          approvalStatus: 'Approved',
          message: 'The user was approved',
        });
      } else {
        return res
          .status(404)
          .json({ approvalStatus: 'Denied', message: 'The user was denied' });
      }
    }
  } catch (error) {
    log.error(error);
    return res.status(500).json({ message: error.message, error });
  }
});

router.post('/', S3Upload.upload.single('photo'), async (req, res) => {
  let user = {
    ...req.body,
    profile_image: req.file
      ? req.file.location
      : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  };
  const newUser = await Vetting.addVettingUser(user);
  try {
    if (newUser) {
      return res.status(201).json({
        newUser,
        message: 'The user was successfully added to vetting database',
      });
    } else {
      return res.status(404).json({ message: 'nope' });
    }
  } catch (error) {
    log.error(error);
    return res.status(500).json({ message: error.message, error });
  }
});

// deny application
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Vetting.deleteUser(id);

    if (deleted === id) {
      sendDenialMail('rasha@rasha.dev');
      const user = await Vetting.findVettingUserById(id);
      deleteFromAuth0(user.sub);
      res.status(200).json({
        sub: deleted.sub,
        msg: `User has been deleted from vetting table.`,
      });
    } else {
      res
        .status(404)
        .json({ msg: 'Unable to find user with that id in vetting table.' });
    }
  } catch (error) {
    log.error(error);
    return res.status(500).json({ message: error.message, error });
  }
});

// approve application
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const approvedUser = await Vetting.approveUser(id);
    if (approvedUser) {
      sendApprovalMail('rasha@rasha.dev');
      return res.status(201).json({
        approvedUser,
        message: 'The user was moved successfully to the users table',
      });
    } else {
      return res.status(404);
    }
  } catch (error) {
    log.error(error);
    return res.status(500).json({ message: error.message, error });
  }
});

module.exports = router;
