import * as types from '../actions/actionTypes';
import initialState from './initialState';

const animalFormReducer = (state = initialState.animalForm, action) => {
  let animalForm = {
    errors: '',
    success: false,
    success_image: false,
    sended_images: state.sended_images,
    id: '',
    deleteSuccess: false,
    deleteError: ''
  };

  switch (action.type) {
    case types.SEND_ANIMAL_FORM_ERROR:
      animalForm.errors = action.errors.error;
      return animalForm;
    case types.SEND_ANIMAL_FORM_SUCCESS:
      animalForm.success = true;
      animalForm.id = action.response.id;
      return animalForm;
    case types.EDIT_ANIMAL_SUCCESS:
      animalForm.success = true;
      animalForm.id = action.response.id;
      return animalForm;
    case types.EDIT_ANIMAL_ERROR:
      animalForm.errors = action.errors.error;
      return animalForm;
    case types.CANCEL_ANIMAL_FORM:
      return animalForm;
    case types.UPLOAD_IMAGE_ANIMAL_SUCCESS: {
      let cantImages = state.sended_images + 1;
      return Object.assign({}, state, { success_image: true, sended_images: cantImages });
    }
    case types.UPLOAD_IMAGE_ANIMAL_ERROR: {
      let cantImages = state.sended_images + 1;
      return Object.assign({}, state, { success_image: false, sended_images: cantImages });
    }
    case types.DELETE_ANIMAL_SUCCESS: {
      return Object.assign({}, state, { deleteSuccess: true });
    }
    case types.DELETE_ANIMAL_ERROR:
      return Object.assign({}, state, { deleteError: action.response.error });
    default:
      return state;
  }
};

export default animalFormReducer;
