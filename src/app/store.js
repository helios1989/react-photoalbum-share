import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import albumSliceReducer from '../features/albums/albumSlice';
import photoSlice from '../features/photos/photoSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    albums: albumSliceReducer,
    photos: photoSlice,
  },
});
