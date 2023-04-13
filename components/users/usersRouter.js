const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} = require('./usersController');

router.get('/', getAllUsers);
router.get('/:usid', getSingleUser);
router.post('/', createUser);
router.put('/:usid', updateUser);
router.delete('/:usid', deleteUser);

module.exports = router;
