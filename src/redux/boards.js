import * as ActionTypes from './ActionTypes';

export const Boards = (state = {isLoading: true,
    errMess: null,
    addstatus: false,
    boards:[]}, action) => {
    switch(action.type) {
        case ActionTypes.ADD_BOARDS:
            return {...state, isLoading: false, addstatus: false, errMess: null, boards: action.payload};
        case ActionTypes.BOARDS_LODING:
            return {...state, isLoading: true,addstatus: false, errMess: null, boards: []};
        case ActionTypes.BOARDS_FAILED:
            return {...state, isLoading: false,addstatus: false,errMess: action.payload}
        case ActionTypes.ADD_NEWBOARD:
            var board = action.payload;
            return {...state,addstatus: true, boards:state.boards.concat(board)}
        case ActionTypes.DELETE_BOARD:
            return {...state,addstatus: true, boards:action.payload}
        case ActionTypes.EDIT_BOARD:
            return {...state,addstatus: true, boards:action.payload}
        default:
            return state;
    }
}