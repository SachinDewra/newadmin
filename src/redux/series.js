import * as ActionTypes from './ActionTypes';

export const Series = (state = {isLoading: true,
    errMess: null,
    addstatus: false,
    series:[]}, action) => {
    switch(action.type) {
        case ActionTypes.ADD_SERIES:
            return {...state, isLoading: false, addstatus: false, errMess: null, series: action.payload};
        case ActionTypes.SERIES_LODING:
            return {...state, isLoading: true,addstatus: false, errMess: null, boards: []};
        case ActionTypes.SERIES_FAILED:
            return {...state, isLoading: false,addstatus: false,errMess: action.payload}
        case ActionTypes.ADD_NEWSERIES:
            var series = action.payload;
            return {...state,addstatus: true, series:state.series.concat(series)}
        case ActionTypes.DELETE_SERIES:
            return {...state,addstatus: true, series:action.payload}
        case ActionTypes.EDIT_SERIES:
            return {...state,addstatus: true, series:action.payload}
        default:
            return state;
    }
}

