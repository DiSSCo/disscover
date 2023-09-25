/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/store';

/* Import Types */
import { PaginationObject, Dict } from 'global/Types';


export interface GeneralState {
    screenSize: string,
    promptMessages: {
        key: string,
        message: string,
        template?: string
    }[];
    language: string;
    introTopic: string;
    paginationObject: PaginationObject;
    annotoriousToggle: boolean;
};

const initialState: GeneralState = {
    screenSize: 'lg',
    promptMessages: [],
    language: 'EN',
    introTopic: '',
    paginationObject: {} as PaginationObject,
    annotoriousToggle: false
};

export const GeneralSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        setScreenSize: (state, action: PayloadAction<string>) => {
            state.screenSize = action.payload;
        },
        setPromptMessages: (state, action: PayloadAction<{ key: string, message: string, template?: string }[]>) => {
            state.promptMessages = action.payload;
        },
        pushToPromptMessages: (state, action: PayloadAction<{ key: string, message: string, template?: string }>) => {
            state.promptMessages.push(action.payload);
        },
        removeFromPromptMessages: (state, action: PayloadAction<{ key: string, message: string, template?: string }>) => {
            state.promptMessages.splice(state.promptMessages.findIndex(promptMessage => promptMessage.key === action.payload.key), 1);
        },
        setLanguage: (state, action: PayloadAction<string>) => {
            state.language = action.payload;
        },
        setIntroTopic: (state, action: PayloadAction<string>) => {
            state.introTopic = action.payload;
        },
        setPaginationObject: (state, action: PayloadAction<PaginationObject>) => {
            state.paginationObject = action.payload;
        },
        setAnnotoriousToggle: (state, action: PayloadAction<boolean>) => {
            state.annotoriousToggle = action.payload;
        }
    },
})

/* Action Creators */
export const {
    setScreenSize,
    setPromptMessages,
    pushToPromptMessages,
    removeFromPromptMessages,
    setLanguage,
    setIntroTopic,
    setPaginationObject,
    setAnnotoriousToggle
} = GeneralSlice.actions;

/* Connect with Root State */
export const getScreenSize = (state: RootState) => state.general.screenSize;
export const getPromptMessages = (state: RootState) => state.general.promptMessages;
export const getLanguage = (state: RootState) => state.general.language;
export const getIntroTopic = (state: RootState) => state.general.introTopic;
export const getPaginationObject = (state: RootState) => state.general.paginationObject;
export const getAnnotoriousToggle = (state: RootState) => state.general.annotoriousToggle;

export default GeneralSlice.reducer;