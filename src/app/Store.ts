/* Import Dependencies */
import { combineReducers, configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import type { PreloadedStateShapeFromReducersMapObject } from '@reduxjs/toolkit';

/* Import Redux Slices */
import BootReducder from 'redux-store/BootSlice';
// import GeneralReducer from 'redux-store/GeneralSlice';
import GlobalReducer from 'redux-store/GlobalSlice';
// import SearchReducer from 'redux-store/SearchSlice';
import DigitalSpecimenReducer from 'redux-store/DigitalSpecimenSlice';
// import DigitalMediaReducer from 'redux-store/DigitalMediaSlice';
// import AnnotateReducer from 'redux-store/AnnotateSlice';
// import UserReducer from 'redux-store/UserSlice';


const rootReducer = combineReducers({
  boot: BootReducder,
  // general: GeneralReducer,
  global: GlobalReducer,
  // search: SearchReducer,
  digitalSpecimen: DigitalSpecimenReducer,
  // digitalMedia: DigitalMediaReducer,
  // annotate: AnnotateReducer,
  // user: UserReducer
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
