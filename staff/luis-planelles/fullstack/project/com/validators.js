const { ContentError } = require('./errors');

const validateName = (name) => {
  const containsSpaces = /\s/g;

  if (typeof name !== 'string') throw new TypeError('name is not a string');
  if (!name.length) throw new ContentError('name is empty');
  if (containsSpaces.test(name)) throw new ContentError('name contains spaces');

  return name.trim();
};

const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (typeof email !== 'string') throw new TypeError('email is not a string');
  if (!email.length) throw new ContentError('email is empty');
  if (!emailRegex.test(email)) throw new ContentError('invalid email');

  return email;
};

const validatePassword = (password, type = 'password') => {
  const isLongEnough = password.length >= 8;
  const hasDigit = /\d/;
  const hasLowercase = /[a-z]/;
  const hasUppercase = /[A-Z]/;
  const hasSpecialChar = /[!@#$%^&*()_+~`=[\]{}|:;"'<,>.?/]/;
  const noWhitespace = /^\S+$/;

  if (typeof password !== 'string')
    throw new TypeError(`${type} is not a string`);
  if (!password.length) throw new ContentError(`${type} is empty`);
  if (!isLongEnough)
    throw new RangeError(`${type} not be at least 8 characters long`);
  if (!hasDigit.test(password))
    throw new ContentError(`${type} not contains one digit`);
  if (!hasLowercase.test(password))
    throw new ContentError(`${type} not contains one lowercase letter`);
  if (!hasUppercase.test(password))
    throw new ContentError(`${type} not contains one uppercase letter`);
  if (!hasSpecialChar.test(password))
    throw new ContentError(`${type} not contains one special character`);
  if (!noWhitespace.test(password))
    throw new ContentError(`${type} contains any whitespace characters`);

  return password;
};

const validateId = (id, explain = 'id') => {
  const regexHex = /^#([0-9A-Fa-f]{3}){1,2}$/;

  if (typeof id !== 'string') throw new TypeError(`${explain} is not a string`);
  if (!id.trim().length) throw new ContentError(`${explain} is empty`);
  if (id.trim().length !== 24)
    throw new ContentError(`${explain} does not have 24 characters`);
  if (regexHex.test(id))
    throw new ContentError(`${explain} is not hexagecimal`);
};

const validateText = (text, explain = 'string') => {
  if (typeof text !== 'string')
    throw new TypeError(`${explain} is not a string`);
  if (!text.trim().length) throw new ContentError(`${explain} is empty`);
};

const validateDateString = (date, explain = 'date') => {
  const dateObject = new Date(date);

  if (!(dateObject instanceof Date))
    throw new TypeError(`${explain} is not a Date object`);

  if (isNaN(dateObject.getTime()))
    throw new ContentError(`${explain} is not a valid Date`);

  return date;
};

const validateObject = (object, explain = 'object') => {
  if (typeof object !== 'object' || object === null)
    throw new TypeError(`${explain} is not an object`);

  return object;
};

const validateArray = (array, explain = 'array') => {
  if (!Array.isArray(array)) {
    throw new TypeError(`${explain} is not an array`);
  }

  return array;
};

const validateToken = (token, explain = 'token') => {
  if (typeof token !== 'string')
    throw new TypeError(`${explain} is not a string`);
  if (token.split('.').length !== 3)
    throw new ContentError(`${explain} is not a valid`);
};

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
  validateId,
  validateText,
  validateDateString,
  validateObject,
  validateArray,
  validateToken,
};
