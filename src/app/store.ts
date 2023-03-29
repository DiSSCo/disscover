/* Import Dependencies */
import { combineReducers, configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';

/* Import Redux Slices */
import SearchReducer from 'redux/search/SearchSlice';
import SpecimenReducer from 'redux/specimen/SpecimenSlice';
import DigitalMediaReducer from 'redux/digitalMedia/DigitalMediaSlice';
import AnnotateReducer from 'redux/annotate/AnnotateSlice';
import UserReducer from 'redux/user/UserSlice';


const rootReducer = combineReducers({
  search: SearchReducer,
  specimen: SpecimenReducer,
  digitalMedia: DigitalMediaReducer,
  annotate: AnnotateReducer,
  user: UserReducer
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
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
