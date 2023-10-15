import {createStore, combineReducers, applyMiddleware} from 'redux';
import { Boards } from './boards';
import thunk from 'redux-thunk'; //middleware
import logger from 'redux-logger'; //middleware
import { Subjects } from './subjects';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            boards: Boards,
            subjects: Subjects,
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}