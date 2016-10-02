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
    return api.get(`${consts.API_STAGING_URL}/animals/${id_animal}`);
  }

  static uploadImage(image, id) {
    return api.post(`${consts.API_STAGING_URL}/animals/${id}/images`, image);
  }

  static showAnimalImages(id_animal, page) {
    return api.get(`${consts.API_STAGING_URL}/animals/${id_animal}/images?row=15&page=${page}`);
  }

  static removeAnimalImages(id_animal, id_image) {
    return api.delete(`${consts.API_STAGING_URL}/animals/${id_animal}/images/${id_image}`);
  }

  static getAnimals(row, col) {
    return api.get(`${consts.API_STAGING_URL}/animals?page=${col}&row=${row}`);
  }

  static editAnimal(id_animal, animal) {
    return api.put(`${consts.API_STAGING_URL}/animals/${id_animal}`, animal);
  }

  static getEvents(id_animal) {
    return api.get(`${consts.APIARY_URL}/animals/${id_animal}/events`);
  }
}

export default AnimalApi;

export const parseAnimal = (animal) => {
  let parsedAnimal = Object.assign({}, animal);
  for (let prop in parsedAnimal) {
    if (parsedAnimal[prop] === '') {
      delete parsedAnimal[prop];
    }
  }
  parsedAnimal.birthdate = `${parsedAnimal.birthdate}-1`;
  return parsedAnimal;
};

export const parseImage = (file) => {
  let parsedImage = { image: { file: file } };
  return parsedImage;
};
