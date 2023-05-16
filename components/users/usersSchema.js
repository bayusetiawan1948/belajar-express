const Joi = require('joi').extend(require('@joi/date'));

const usersSchema = Joi.object({
  name: Joi.string().min(2).max(35).required().messages({
    'string.base': 'Nama harus berupa huruf',
    'string.min': 'Masukan nama minimal 2 huruf',
    'string.max': 'Masukan nama maximal 35 huruf',
    'string.empty': 'Masukan nama anda',
    'any.required': 'Masukan nama anda',
  }),
  sex: Joi.string().valid('Male', 'Female').required().messages({
    'any.required': 'Masukan jenis kelamin anda',
    'any.only': 'Masukan jenis kelamin sesuai ketentuan',
  }),
  religion: Joi.string()
    .valid('Islam', 'Kristen', 'Protestan', 'Budha', 'Hindu', 'Konghuchu')
    .required()
    .messages({
      'any.only': 'Masukan agama sesuai ketentuan',
      'any.required': 'Masukan agama anda',
    }),
  address: Joi.string().min(6).max(25).required().messages({
    'string.min': 'Masukan alamat minimal 6 huruf',
    'string.max': 'Masukan alamat maximal 25 huruf',
    'string.empty': 'Masukan alamat anda',
    'any.required': 'Masukan alamat anda',
  }),
  birth_date: Joi.date().utc().format('DD-MM-YYYY').required().messages({
    'date.format': 'Masukan tanggal lahir sesuai format',
    'any.required': 'Masukan tanggal lahir anda',
  }),
  phone_number: Joi.number()
    .min(1)
    .max(9999999999999999)
    .positive()
    .required()
    .messages({
      'number.base': 'masukan phone number dengan angka',
      'number.positive': 'Masukan phone number dengan angka positif',
      'number.min': 'Masukan phone number minimal 8 angka',
      'number.max': 'Masukan phone number maximal 16 angka',
      'any.required': 'Masukan phone number anda',
    }),
});

module.exports = usersSchema;
