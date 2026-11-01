import type { Service } from '../types'; // Добавлено слово type

// Константы типов
export const ADD_SERVICE = 'ADD_SERVICE';
export const UPDATE_SERVICE = 'UPDATE_SERVICE';
export const DELETE_SERVICE = 'DELETE_SERVICE';

export const SET_FORM_FIELD = 'SET_FORM_FIELD';
export const START_EDITING = 'START_EDITING';
export const CANCEL_EDITING = 'CANCEL_EDITING';
export const CLEAR_FORM = 'CLEAR_FORM';
export const SET_VALIDATION_ERRORS = 'SET_VALIDATION_ERRORS';

// Экшены для услуг
export const addService = (name: string, price: number) => ({
  type: ADD_SERVICE as typeof ADD_SERVICE,
  payload: { name, price },
});

export const updateService = (id: string, name: string, price: number) => ({
  type: UPDATE_SERVICE as typeof UPDATE_SERVICE,
  payload: { id, name, price },
});

export const deleteService = (id: string) => ({
  type: DELETE_SERVICE as typeof DELETE_SERVICE,
  payload: { id },
});

// Экшены для формы
export const setFormField = (field: 'name' | 'price', value: string) => ({
  type: SET_FORM_FIELD as typeof SET_FORM_FIELD,
  payload: { field, value },
});

export const startEditing = (service: Service) => ({
  type: START_EDITING as typeof START_EDITING,
  payload: { service },
});

export const cancelEditing = () => ({
  type: CANCEL_EDITING as typeof CANCEL_EDITING,
});

export const clearForm = () => ({
  type: CLEAR_FORM as typeof CLEAR_FORM,
});

export const setValidationErrors = (errors: { name?: string; price?: string }) => ({
  type: SET_VALIDATION_ERRORS as typeof SET_VALIDATION_ERRORS,
  payload: { errors },
});

export type ServiceAction =
  | ReturnType<typeof addService>
  | ReturnType<typeof updateService>
  | ReturnType<typeof deleteService>;

export type FormAction =
  | ReturnType<typeof setFormField>
  | ReturnType<typeof startEditing>
  | ReturnType<typeof cancelEditing>
  | ReturnType<typeof clearForm>
  | ReturnType<typeof setValidationErrors>;


  
// Константы для фильтра
export const SET_SEARCH_TERM = 'SET_SEARCH_TERM';
export const CLEAR_SEARCH = 'CLEAR_SEARCH';

// Экшены для фильтра
export const setSearchTerm = (searchTerm: string) => ({
  type: SET_SEARCH_TERM as typeof SET_SEARCH_TERM,
  payload: { searchTerm },
});

export const clearSearch = () => ({
  type: CLEAR_SEARCH as typeof CLEAR_SEARCH,
});

export type FilterAction =
  | ReturnType<typeof setSearchTerm>
  | ReturnType<typeof clearSearch>;
