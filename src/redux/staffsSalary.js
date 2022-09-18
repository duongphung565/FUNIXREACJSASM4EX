import * as ActionType from './ActionTypes';
export const StaffsSalary = (state = {
    isLoading: true,
    errMess: null,
    staffsSalary: []
}, action) => {
    switch (action.type) {
        case ActionType.ADD_STAFFS_SALARY:
            return { ...state, isLoading: false, errMess: null, staffsSalary: action.payload };
        case ActionType.STAFFS_SALARY_LOADING:
            return { ...state, isLoading: true, errMess: null, staffsSalary: [] };
        case ActionType.STAFFS_SALARY_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, staffsSalary: [] };
        default:
            return state;
    }

}