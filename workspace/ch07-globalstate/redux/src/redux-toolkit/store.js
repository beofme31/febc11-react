import counterSlice from '@redux-toolkit/counterSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    counterStore: counterSlice.reducer
  }
});

export default store;