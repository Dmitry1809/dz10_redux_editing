import { legacy_createStore as createStore, combineReducers } from 'redux';
import { servicesReducer } from '../reducers/servicesReducer';
import { formReducer } from '../reducers/formReducer';
import { filterReducer } from '../reducers/filterReducer';

const rootReducer = combineReducers({
  services: servicesReducer,
  form: formReducer,
  filter: filterReducer, // Добавили редюсер фильтра
});

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('services_state');
    if (serializedState === null) return undefined;
    return { services: JSON.parse(serializedState) };
  } catch (e) {
    console.error("Не удалось загрузить данные из localStorage", e);
    return undefined;
  }
};

const preloadedState = loadFromLocalStorage();

export const store = createStore(rootReducer, preloadedState);


store.subscribe(() => {
  try {
    const state = store.getState();
    const serializedState = JSON.stringify(state.services);
    localStorage.setItem('services_state', serializedState);
  } catch (e) {
    console.error("Не удалось сохранить данные в localStorage", e);
  }
});
