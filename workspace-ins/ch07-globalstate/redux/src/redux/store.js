import counterReducer from '@redux/counterReducer';
import { legacy_createStore as createStore } from 'redux';

const store = createStore(counterReducer);

export default store;