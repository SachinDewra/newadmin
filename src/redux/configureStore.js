import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'; //middleware
import logger from 'redux-logger'; //middleware
import { Boards } from './boards';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            boards: Boards
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}