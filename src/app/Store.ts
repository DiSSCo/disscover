/* Import Dependencies */
import { combineReducers, configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import type { PreloadedStateShapeFromReducersMapObject } from '@reduxjs/toolkit';

/* Import Redux Slices */
import AnnotateReducer from 'redux-store/AnnotateSlice';
import BootReducder from 'redux-store/BootSlice';
import DigitalMediaReducer from 'redux-store/DigitalMediaSlice';
import DigitalSpecimenReducer from 'redux-store/DigitalSpecimenSlice';
import GlobalReducer from 'redux-store/GlobalSlice';
import SearchReducer from 'redux-store/SearchSlice';
import TourReducer from 'redux-store/TourSlice';


const rootReducer = combineReducers({
  annotate: AnnotateReducer,
  boot: BootReducder,
  digitalMedia: DigitalMediaReducer,
  digitalSpecimen: DigitalSpecimenReducer,
  global: GlobalReducer,
  search: SearchReducer,
  tour: TourReducer
});

export const setupStore = (preloadedState?: PreloadedStateShapeFromReducersMapObject<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
