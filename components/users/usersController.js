const helper = require('./../../utils/helper.js');
const { array } = require('joi');
const db = require('./../../utils/database.js');
const usersModel = require('./usersModel');
const usersSchema = require('./usersSchema');
const moment = require('moment');
const fs = require('fs');

const getAllUsers = async (req, res) => {
  //getting all user data
  try {
    const statement =
      'SELECT id, name, sex, relgion, birth_date, phone_number FROM users';
    const dataUser = await db.query(statement);

    const respsonse = {
      rc: '00',
      data: dataUser,
    };
    return res.status(200).json(respsonse);
  } catch (error) {
    const resErr = {
      rc: '30',
      message: 'Kesalahan umum',
    };
    return res.status(400).json(resErr);
  }
};

const getSingleUser = async (req, res) => {
  //getting spesifiv data by id
  try {
    const id = req.params.usid;
    if (id === undefined) {
      const resErr = {
        rc: '14',
        message: 'Data tidak ditemukan',
      };
      return res.status(400).json(resErr);
    }

    const statement =
      'SELECT id, name, sex, relgion, birth_date, phone_number, created_at FROM users WHERE id = ? LIMIT 1';
    const user = await db.query(statement, [id]);

    if (user === undefined) {
      const resErr = {
        rc: '14',
        message: 'Data tidak ditemukan',
      };
      return res.status(400).json(resErr);
    }

    const respsonse = {
      rc: '00',
      data: user[0],
    };
    return res.status(200).json(respsonse);
  } catch (error) {
    const resErr = {
      rc: '30',
      message: 'Kesalahan umum',
    };
    console.info(error);
    return res.status(400).json(resErr);
  }
};

const createUser = async (req, res) => {
  //creating data user
  try {
    const inputCheck = usersSchema.validate(req.body);
    const { value, error } = inputCheck;

    if (error) {
      const response = {
        rc: '05',
        message: error.details[0].message,
      };
      return res.status(400).json(response);
    }
    const dateNow = moment();
    const id =
      'U-' +
      dateNow.format('DD') +
      (Math.floor(Math.random() * 10) + 1) +
      dateNow.format('MM') +
      (Math.floor(Math.random() * 10) + 1) +
      dateNow.format('YYYY');
    const createdAt = dateNow.unix();
    let { name, sex, religion, address, birth_date, phone_number } = value;

    name = name.replace(/\w+/g, function (w) {
      return w[0].toUpperCase() + w.slice(1).toLowerCase();
    });

    birth_date = moment(birth_date).format('YYYY-MM-DD');

    const statement =
      'INSERT INTO `users`(`id`, `name`, `sex`, `relgion`, `address`, `birth_date`, `phone_number`, `created_at`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    const user = await db.query(statement, [
      id,
      name,
      sex,
      religion,
      address,
      birth_date,
      phone_number,
      createdAt,
    ]);

    if (user.affectedRows == 0) {
      const resErr = {
        rc: '91',
        message: 'Gagal menyimpan kedatabase',
      };

      return res.status(400).json(resErr);
    }

    const resErr = {
      rc: '00',
      message: 'Berhasil menambahkan data',
    };
    return res.status(200).json(resErr);
  } catch (error) {
    const resErr = {
      rc: '30',
      message: 'Kesalahan umum',
    };
    console.info(error);
    return res.status(400).json(resErr);
  }
};

const updateUser = async (req, res) => {
  //updating user data
  try {
    const id = req.params.usid;
    if (id === undefined) {
      const resErr = {
        rc: '14',
        message: 'Data tidak ditemukan',
      };
      return res.status(400).json(resErr);
    }

    const statementSingle =
      'SELECT name, sex, relgion, address, birth_date, phone_number FROM users WHERE id = ? LIMIT 1';
    const data = await db.query(statementSingle, [id]);
    const single = data[0];
    if (single === undefined) {
      const resErr = {
        rc: '14',
        message: 'Data tidak ditemukan',
      };
      return res.status(400).json(resErr);
    }
    let { name, sex, religion, address, birth_date, phone_number } =
      helper.saveInput(req.body, single);

    name = name.replace(/\w+/g, function (w) {
      return w[0].toUpperCase() + w.slice(1).toLowerCase();
    });

    birth_date = moment(birth_date, 'DD-MM-YYYY').format('YYYY-MM-DD');

    const statementUpdate =
      'UPDATE `users` SET name=?,sex=?,relgion=?,address=?,birth_date=?,phone_number=? WHERE id=?';
    const update = await db.query(statementUpdate, [
      name,
      sex,
      religion,
      address,
      birth_date,
      phone_number,
      id,
    ]);

    if (update.affectedRows == 0) {
      const resErr = {
        rc: '91',
        message: 'Gagal mengubah kedatabase',
      };

      return res.status(400).json(resErr);
    }

    const resErr = {
      rc: '00',
      message: 'Berhasil mengubah data',
    };
    return res.status(200).json(resErr);
  } catch (error) {
    const resErr = {
      rc: '30',
      message: 'Kesalahan umum',
    };
    console.info(error);
    return res.status(400).json(resErr);
  }
};

const deleteUser = async (req, res) => {
  //deleting user data
  try {
    const id = req.params.usid;

    if (id === undefined) {
      const resErr = {
        rc: '14',
        message: 'Data tidak ditemukan',
      };
      return res.status(400).json(resErr);
    }

    const statementSingle =
      'SELECT name, sex, relgion, address, birth_date, phone_number FROM users WHERE id = ? LIMIT 1';
    const data = await db.query(statementSingle, [id]);
    const single = data[0];
    if (single === undefined) {
      const resErr = {
        rc: '14',
        message: 'Data tidak ditemukan',
      };
      return res.status(400).json(resErr);
    }

    const statementDelete = 'DELETE FROM `users` WHERE id = ?';
    const deleteData = await db.query(statementDelete, [id]);
    if (deleteData.affectedRows == 0) {
      const resErr = {
        rc: '91',
        message: 'Gagal menghapus kedatabase',
      };

      return res.status(400).json(resErr);
    }
    const resErr = {
      rc: '00',
      message: 'Berhasil menghapus data',
    };
    return res.status(200).json(resErr);
  } catch (error) {
    const resErr = {
      rc: '30',
      message: 'Kesalahan umum',
    };
    return res.status(400).json(resErr);
  }
};

const uploadFiles = async (req, res) => {
  try {
    if (!req.files) {
      if (single === undefined) {
        const resErr = {
          rc: '05',
          message: 'tidak ada file gambar',
        };
        return res.status(400).json(resErr);
      }
    }
    //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
    let avatar = req.files.avatar;
    console.info(avatar);

    //Use the mv() method to place the file in the upload directory (i.e. "uploads")
    const dateNow = moment();
    const rightnow = dateNow.unix();
    avatar.mv('./public/uploads/' + rightnow + '.png');

    const resErr = {
      rc: '00',
      message: 'Berhasil menghapus data',
    };
    return res.status(200).json(resErr);
  } catch (error) {
    const resErr = {
      rc: '30',
      message: 'Kesalahan umum',
    };
    return res.status(400).json(resErr);
  }
};

const deleteFiles = async (req, res) => {
  try {
    console.info(req.body.fileName);
    fs.unlinkSync('./public/uploads/' + req.body.fileName + '.png');
    const resErr = {
      rc: '00',
      message: 'Berhasil menghapus data',
    };
    return res.status(200).json(resErr);
  } catch (error) {
    const resErr = {
      rc: '30',
      message: 'Kesalahan umum',
    };
    console.info(error);
    return res.status(400).json(resErr);
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  uploadFiles,
  deleteFiles,
};
