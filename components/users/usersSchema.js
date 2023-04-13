const Joi = require('joi');

const usersSchema = Joi.object({
  name: Joi.string().min(2).max(35).required().messages({
    'string.min': 'Masukan nama minimal 2 huruf',
    'string.max': 'Masukan nama maximal 35 huruf',
    'string.empty': 'Masukan nama anda',
  }),
  sex: Joi.string().min(4).max(6).required(),
  religion: Joi.string().min(6).max(14).required(),
  address: Joi.string().min(6).max(25).required(),
  birth_date: Joi.date().required(),
  phone_number: Joi.string().min(8).max(16).required(),
});

module.exports = usersSchema;
