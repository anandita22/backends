const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const shortid = require('shortid');
const saltRounds = 10;

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

exports.hashPassword = async (plainPassword, next) => {
  try {
    return await bcrypt.hash(plainPassword, saltRounds);
  } catch (err) {
    next(err);
  }
};

exports.verifyPassword = async (plainPassword, hashPassword, next) => {
  try {
    return await bcrypt.compare(plainPassword, hashPassword);
  } catch (err) {
    next(err);
  }
};

exports.uuid = function () {
  const id = uuidv4();
  return id.replace(/-/g, '');
};

exports.shortid = function () {
  return shortid.generate().toLowerCase();
};

exports.splitName = function (name, count) {
  if (name) {
    let result = name.substr(0, count);
    if (name.length > count) {
      result += '...';
    }
    return result;
  } else {
    return '';
  }
};

exports.parseDate = function (timestamp) {
  if (timestamp) {
    const date = new Date(timestamp);
    return `${
      months[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
  } else {
    return '---';
  }
};
