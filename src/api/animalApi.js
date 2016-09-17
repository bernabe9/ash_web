import api from './apiService.js';
import * as consts from '../constants/apiConstants.js';

class AnimalApi {
  static sendForm(animal) {
    return api.post(`${consts.API_STAGING_URL}/animals`, animal);
  }

  static getSpecies() {
    return api.get(`${consts.API_STAGING_URL}/species`);
  }

  static showAnimal(id_animal) {
    return api.get(`${consts.APIARY_URL}/animals/${id_animal}`);
  }
}

export default AnimalApi;

export const parseAnimal = (animal) => {
  let parsedAnimal = Object.assign({}, animal);
  parsedAnimal.birthdate = `${parsedAnimal.birthdate}-1`;
  return parsedAnimal;
};