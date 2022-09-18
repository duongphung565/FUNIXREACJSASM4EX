import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';
import { Staffs } from "./staffs";
import { Department } from "./departments";
import { StaffsSalary } from "./staffsSalary";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            staffs: Staffs,
            department: Department,
            staffsSalary: StaffsSalary
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
}
