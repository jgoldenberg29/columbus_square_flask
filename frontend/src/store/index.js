import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk';
import session from './session'
import events from './events'
import news from './news'

const rootReducer = combineReducers({
  session,
  events,
  news,
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;


// import {configureStore, applyMiddleware } from '@reduxjs/toolkit'
// import sessionReducer from './session'
// import images from './images'
// import eventReducer from './events'
// import newsReducer from './news'
// import galleryReducer from './gallery'
// import allDataReducer from './allData'
// import { thunk } from 'redux-thunk'
// import logger from 'redux-logger'

// const store = configureStore({
//     reducer: {
//         session: sessionReducer,
//         allData: allDataReducer,
//         gallery: galleryReducer,
//         events: eventReducer,
//         news: newsReducer,
//         images,
//     },
//     middleware: (getDefaultMiddleware) => {
//         if (process.env.NODE_ENV === 'production') {
//             return getDefaultMiddleware().concat(thunk)
//         } else {
//             return getDefaultMiddleware().concat(logger).concat(thunk)
//         }
//     },
// })


// export default store
