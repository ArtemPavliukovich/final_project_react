import { createStore } from 'redux';
import rootReducer from './reducers';

const sessionStorageStore = JSON.parse(sessionStorage.getItem('store'));

const store = createStore(rootReducer, sessionStorageStore ?? {});

window.addEventListener('beforeunload', () => {
  sessionStorage.setItem('store', JSON.stringify(store.getState()));
});

export default store;