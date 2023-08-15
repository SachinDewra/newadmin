import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'; //middleware
import logger from 'redux-logger'; //middleware

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}