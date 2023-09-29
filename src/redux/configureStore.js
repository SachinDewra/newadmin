import {createStore, combineReducers, applyMiddleware} from 'redux';
import { Boards } from './boards';
import thunk from 'redux-thunk'; //middleware
import logger from 'redux-logger'; //middleware

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            boards: Boards
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}