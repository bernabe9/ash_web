import * as messages from '../constants/apiMessage';
import * as stringValid from './StringValidate';

export const validateEmptyField = (value) => {
  return value ? '' : messages.ERROR_REQUIRED_FIELD;
};

export const notErrors = (errors) => {
  let valid = true;
  for (let i in errors) {
    valid = valid && !errors[i];
  }
  return valid;
};

export const lessThanToday = (date) => {
  let today = new Date();
  let newDate = new Date(date);
  const lessDate = newDate <= today;
  return lessDate ? '' : messages.ERROR_LESS_DATE;
};

export const compareDates = (date1, date2, dateName) => {
  let newDate1 = new Date(date1);
  let newDate2 = new Date(date2);
  const lessDate = newDate2 < newDate1;
  return lessDate ? '' : messages.ERROR_GREATER_DATE(dateName);
};

export const editAnimalPerfil = (perfil) => {
 return (perfil === 'animals_edit') || (perfil === 'super_user');
};

export const editAdopterPerfil = (perfil) => {
 return (perfil === 'adopters_edit') || (perfil === 'super_user');
};

export const requiredRace = (id) => {
  return id == '1' || id == '2' || id == '3';
};

export const getAge = (date) => {
  let today = new Date();
  const tokens = date.split("-");
  const age = today.getFullYear() - parseInt(tokens[0]);
  return age.toString();
};

export const validateCi = (ci) => {
  return stringValid.isCi(ci) ? '' : messages.ERROR_CI;
};

export const validateFullName = (fullName) => {
  const splitFullName = fullName.split(' ');
  const valid = splitFullName[0] && splitFullName[1] && splitFullName.length === 2;
  return valid ? '' : messages.ERROR_EMPTY_FULLNAME;
};

export const validateEmail = (email) => {
  return stringValid.isEmail(email) ? '' : messages.ERROR_EMAIL;
};

export const validatePhone = (phone) => {
  return stringValid.onlyNumbers(phone) ? '' : messages.ERROR_PHONE;
};

export const validateDateStatistic = (date_start, date_finish) => {
  if (!date_start || !date_finish) {
    return false;
  }
  let dateBegin = date_start.split('-');
  let dateFinish = date_finish.split('-');
  let monthB = parseInt(dateBegin[1]);
  let monthF = parseInt(dateFinish[1]);
  let yearB = parseInt(dateBegin[0]);
  let yearF = parseInt(dateFinish[0]);
  let cond1 = yearB === yearF && (monthF - monthB) <= 3;
  let cond2 = yearB === yearF - 1 && ((monthF + monthB) % 12) <= 3;
  return cond1 || cond2;
};
