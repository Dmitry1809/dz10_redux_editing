import {
  SET_FORM_FIELD,
  START_EDITING,
  CANCEL_EDITING,
  CLEAR_FORM,
  SET_VALIDATION_ERRORS,
  type FormAction,
} from '../actions';
import type { FormErrors } from '../types'; // Добавлено слово type

const initialState = {
  name: '',
  price: '',
  editingId: null as string | null,
  errors: {} as FormErrors,
};

export const formReducer = (state = initialState, action: FormAction) => {
  switch (action.type) {
    case SET_FORM_FIELD:
      return {
        ...state,
        [action.payload.field]: action.payload.value,
        errors: { ...state.errors, [action.payload.field]: undefined }, // убираем ошибку при вводе
      };
    case START_EDITING:
      return {
        ...state,
        name: action.payload.service.name,
        price: action.payload.service.price.toString(),
        editingId: action.payload.service.id,
        errors: {},
      };
    case CANCEL_EDITING:
    case CLEAR_FORM:
      return initialState;
    case SET_VALIDATION_ERRORS:
      return {
        ...state,
        errors: action.payload.errors,
      };
    default:
      return state;
  }
};
