const Joi = require('joi');
const usersModel = require('./usersModel');
const usersSchema = require('./usersSchema');
const moment = require('moment');

const getAllUsers = (req, res) => {
  //getting all user data
  try {
    const dataUser = usersModel.map((u) => ({
      id: u.id,
      name: u.name,
      sex: u.sex,
    }));

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

const getSingleUser = (req, res) => {
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

    const user = usersModel.filter((u) => u.id === id)[0];

    if (user === undefined) {
      const resErr = {
        rc: '14',
        message: 'Data tidak ditemukan',
      };
      return res.status(400).json(resErr);
    }

    const respsonse = {
      rc: '00',
      data: user,
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

const createUser = (req, res) => {
  //creating data user
  try {
    const inputCheck = usersSchema.validate(req.body);
    const { value, error } = inputCheck;
    if (error !== null) {
      const response = {
        rc: '05',
        message: error.details[0].message,
      };
      res.status(400).json(response);
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
    let { name, sex, religion, address, birth_date, phone_number } = req.body;

    if (
      !name ||
      !sex ||
      !religion ||
      !address ||
      !birth_date ||
      !phone_number
    ) {
      const resErr = {
        rc: '05',
        message: 'Inputan tidak lengkap',
      };
      return res.status(400).json(resErr);
    }

    name = name.replace(/\w+/g, function (w) {
      return w[0].toUpperCase() + w.slice(1).toLowerCase();
    });

    birth_date = moment(birth_date).format('DD-MM-YYYY');

    const userPush = {
      id,
      name,
      sex,
      religion,
      address,
      birth_date,
      phone_number,
      createdAt,
    };
    usersModel.push(userPush);

    const isSuccess = usersModel.filter((u) => u.id === id).length > 0;
    if (!isSuccess) {
      const resErr = {
        rc: '91',
        message: 'Gagal menambahkan data',
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

const updateUser = (req, res) => {
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

    const array = usersModel.findIndex((bs) => bs.id === id);

    if (array === -1) {
      const resErr = {
        rc: '14',
        message: 'Data tidak ditemukan',
      };
      return res.status(400).json(resErr);
    }

    let { name, sex, religion, address, birth_date, phone_number } = req.body;

    if (
      !name ||
      !sex ||
      !religion ||
      !address ||
      !birth_date ||
      !phone_number
    ) {
      const resErr = {
        rc: '05',
        message: 'Inputan tidak lengkap',
      };
      return res.status(400).json(resErr);
    }

    name = name.replace(/\w+/g, function (w) {
      return w[0].toUpperCase() + w.slice(1).toLowerCase();
    });

    birth_date = moment(birth_date).format('DD-MM-YYYY');

    usersModel[array] = {
      ...usersModel[array],
      name,
      sex,
      religion,
      address,
      birth_date,
      phone_number,
    };

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
    return res.status(400).json(resErr);
  }
};

const deleteUser = (req, res) => {
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

    const array = usersModel.findIndex((bs) => bs.id === id);

    if (array === -1) {
      const resErr = {
        rc: '14',
        message: 'Data tidak ditemukan',
      };
      return res.status(400).json(resErr);
    }

    usersModel.splice(array, 1);

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

// const usersController = new User();
module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
};
