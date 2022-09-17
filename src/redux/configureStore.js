import { configureStore, combineReducers } from '@reduxjs/toolkit';

import bookItSlice from './bookIt';

const reducer = combineReducers(
  {
    bookIt: bookItSlice,
  },
);
const store = configureStore({ reducer });
export default store;
