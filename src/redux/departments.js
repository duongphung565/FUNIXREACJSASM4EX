import * as ActionType from './ActionTypes';

export const Department = (state = {
    isLoading: true,
    errMess: null,
    department: []
}, action) => {
    switch (action.type) {
        case ActionType.ADD_DEPARTMENT:
            return { ...state, isLoading: false, errMess: null, department: action.payload };
        case ActionType.DEPARTMENT_LOADING:
            return { ...state, isLoading: true, errMess: null, department: [] };
        case ActionType.DEPARTMENT_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, department: [] };
        default:
            return state;
    }

}