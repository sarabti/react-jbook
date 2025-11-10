import { persistMiddlware } from './middlewares/persist-middlware';
import reducers from './reducers';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistMiddlware),
})
