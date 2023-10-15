import * as ActionTypes from './ActionTypes';

export const Subjects = (state = {isLoading: true,
    errMess: null,
    addstatus: false,
    subjects:[]}, action) => {
    switch(action.type) {
        case ActionTypes.ADD_SUBJECT:
            return {...state, isLoading: false, addstatus: false, errMess: null, subjects: action.payload};
        case ActionTypes.SUBJECT_LODING:
            return {...state, isLoading: true,addstatus: false, errMess: null, boards: []};
        case ActionTypes.SUBJECT_FAILED:
            return {...state, isLoading: false,addstatus: false,errMess: action.payload}
        case ActionTypes.ADD_NEWSUBJECT:
            var subject = action.payload;
            return {...state,addstatus: true, subjects:state.subjects.concat(subject)}
        case ActionTypes.DELETE_SUBJECT:
            return {...state,addstatus: true, subjects:action.payload}
        case ActionTypes.EDIT_SUBJECT:
            return {...state,addstatus: true, subjects:action.payload}
        default:
            return state;
    }
}

