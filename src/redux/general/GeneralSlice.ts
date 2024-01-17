/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/store';

/* Import Types */
import { PaginationObject } from 'app/Types';


export interface GeneralState {
    screenSize: string,
    windowDimensions: {
        vw: number,
        vh: number
    }
    promptMessages: {
        key: string,
        message: string,
        template?: string
    }[];
    language: string;
    introTopic: string;
    organisations: string[],
    paginationObject: PaginationObject;
    annotoriousMode: string | null;
    phylopicBuild: string;
};

const initialState: GeneralState = {
    screenSize: 'lg',
    windowDimensions: {vw: 0, vh: 0},
    promptMessages: [],
    language: 'EN',
    introTopic: '',
    organisations: [],
    paginationObject: {} as PaginationObject,
    annotoriousMode: null,
    phylopicBuild: ''
};

export const GeneralSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        setScreenSize: (state, action: PayloadAction<string>) => {
            state.screenSize = action.payload;
        },
        setWindowDimensions: (state, action: PayloadAction<{vw: number, vh: number}>) => {
            state.windowDimensions = action.payload;
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
        setOrganisations: (state, action: PayloadAction<string[]>) => {
            state.organisations = action.payload;
        },
        setPaginationObject: (state, action: PayloadAction<PaginationObject>) => {
            state.paginationObject = action.payload;
        },
        setAnnotoriousMode: (state, action: PayloadAction<string | null>) => {
            state.annotoriousMode = action.payload;
        },
        setPhylopicBuild: (state, action: PayloadAction<string>) => {
            state.phylopicBuild = action.payload;
        }
    },
})

/* Action Creators */
export const {
    setScreenSize,
    setWindowDimensions,
    setPromptMessages,
    pushToPromptMessages,
    removeFromPromptMessages,
    setLanguage,
    setIntroTopic,
    setOrganisations,
    setPaginationObject,
    setAnnotoriousMode,
    setPhylopicBuild
} = GeneralSlice.actions;

/* Connect with Root State */
export const getScreenSize = (state: RootState) => state.general.screenSize;
export const getWindowDimensions = (state: RootState) => state.general.windowDimensions;
export const getPromptMessages = (state: RootState) => state.general.promptMessages;
export const getLanguage = (state: RootState) => state.general.language;
export const getIntroTopic = (state: RootState) => state.general.introTopic;
export const getOrganisations = (state: RootState) => state.general.organisations;
export const getPaginationObject = (state: RootState) => state.general.paginationObject;
export const getAnnotoriousMode = (state: RootState) => state.general.annotoriousMode;
export const getPhylopicBuild = (state: RootState) => state.general.phylopicBuild;

export default GeneralSlice.reducer;