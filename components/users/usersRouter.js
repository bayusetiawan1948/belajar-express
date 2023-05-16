const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  uploadFiles,
  deleteFiles,
} = require('./usersController');

router.get('/', getAllUsers);
router.get('/:usid', getSingleUser);
router.post('/', createUser);
router.post('/upload', uploadFiles);
router.post('/upload/delete', deleteFiles);
router.put('/:usid', updateUser);
router.delete('/:usid', deleteUser);

module.exports = router;
