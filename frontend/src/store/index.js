import {configureStore, applyMiddleware } from '@reduxjs/toolkit'
import sessionReducer from './session'
import images from './images'
import eventReducer from './events'
import newsReducer from './news'
import galleryReducer from './gallery'
import allDataReducer from './allData'
import { thunk } from 'redux-thunk'
import logger from 'redux-logger'

const store = configureStore({
    reducer: {
        session: sessionReducer,
        allData: allDataReducer,
        gallery: galleryReducer,
        events: eventReducer,
        news: newsReducer,
        images,
    },
    middleware: (getDefaultMiddleware) => {
        if (process.env.NODE_ENV === 'production') {
            return getDefaultMiddleware().concat(thunk)
        } else {
            return getDefaultMiddleware().concat(logger).concat(thunk)
        }
    },
})


export default store
