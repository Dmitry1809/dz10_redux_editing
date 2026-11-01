import { ADD_SERVICE, UPDATE_SERVICE, DELETE_SERVICE, type ServiceAction } from '../actions';
import type { Service } from '../types'; // Добавлено слово type
import { nanoid } from 'nanoid';

const initialState = {
  items: [
    { id: nanoid(), name: 'Замена стекла', price: 21000 },
    { id: nanoid(), name: 'Замена дисплея', price: 25000 },
    { id: nanoid(), name: 'Замена аккумулятора', price: 4000 },
    { id: nanoid(), name: 'Замена микрофона', price: 2500 },
  ] as Service[],
};

export const servicesReducer = (state = initialState, action: ServiceAction) => {
  switch (action.type) {
    case ADD_SERVICE:
      return {
        ...state,
        items: [...state.items, { id: nanoid(), name: action.payload.name, price: action.payload.price }],
      };
    case UPDATE_SERVICE:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, name: action.payload.name, price: action.payload.price }
            : item
        ),
      };
    case DELETE_SERVICE:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    default:
      return state;
  }
};
