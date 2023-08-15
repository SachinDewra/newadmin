import * as ActionTypes from './ActionTypes';

export const Adminuser = (state={isLoading: true,
    errMess: null,
    dishes:[]}, action) => {
switch(action.type) {
    case ActionTypes.ADD_ADMIN:
            return {...state, isLoading: false, errMess: null, dishes: action.payload};
    default:
        return state;
}
}