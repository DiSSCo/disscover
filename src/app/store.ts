/* Import Dependencies */
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

/* Import Redux Slices */
import SearchReducer from 'redux/search/SearchSlice';
import SpecimenReducer from 'redux/specimen/SpecimenSlice';
import DigitalMediaReducer from 'redux/digitalMedia/DigitalMediaSlice';
import AnnotateReducer from 'redux/annotate/AnnotateSlice';
import UserReducer from 'redux/user/UserSlice';


export const store = configureStore({
  reducer: {
    search: SearchReducer,
    specimen: SpecimenReducer,
    digitalMedia: DigitalMediaReducer,
    annotate: AnnotateReducer,
    user: UserReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
