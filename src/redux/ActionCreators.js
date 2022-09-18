import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';
export const fetchStaffs = () => (dispatch) => {

    console.log("fetchStaffs");
    dispatch(staffsLoading(true));
    return fetch(baseUrl + 'staffs')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error' + response.status + ':' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            }
        )
        .then(response => response.json())
        .then(staffs => dispatch(addStaffs(staffs)))
        .catch(error => dispatch(staffsFailed(error.message)));
}
export const staffsLoading = () => ({
    type: ActionTypes.STAFFS_LOADING
});
export const staffsFailed = (errmess) => ({
    type: ActionTypes.STAFFS_FAILED,
    payload: errmess
});
export const addStaffs = (staffs) => ({
    type: ActionTypes.ADD_STAFFS,
    payload: staffs
});
export const fetchDepartment = () => (dispatch) => {

    dispatch(departmentLoading(true));
    return fetch(baseUrl + 'departments')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error' + response.status + ':' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            }
        )
        .then(response => response.json())
        .then(department => dispatch(addDepartment(department)))
        .catch(error => dispatch(departmentFailed(error.message)));
}
export const departmentLoading = () => ({
    type: ActionTypes.DEPARTMENT_LOADING
});
export const departmentFailed = (errmess) => ({
    type: ActionTypes.DEPARTMENT_FAILED,
    payload: errmess
});
export const addDepartment = (department) => ({
    type: ActionTypes.ADD_DEPARTMENT,
    payload: department
});

export const fetchStaffsSalary = () => (dispatch) => {

    dispatch(staffsSalaryLoading(true));
    return fetch(baseUrl + 'staffsSalary')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error' + response.status + ':' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            }
        )
        .then(response => response.json())
        .then(staffsSalary => dispatch(addStaffsSalary(staffsSalary)))
        .catch(error => dispatch(departmentFailed(error.message)));
}
export const staffsSalaryLoading = () => ({
    type: ActionTypes.STAFFS_SALARY_LOADING
});
export const staffsSalaryFailed = (errmess) => ({
    type: ActionTypes.STAFFS_SALARY_FAILED,
    payload: errmess
});
export const addStaffsSalary = (staffsSalary) => ({
    type: ActionTypes.ADD_STAFFS_SALARY,
    payload: staffsSalary
});

export const postStaff = (newStaff) => (dispatch) => {
    return fetch(baseUrl + 'staffs', {
        method: "POST",
        body: JSON.stringify(newStaff),
        headers: {
            "content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error' + response.status + ':' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            }
        )
        .then(response => response.json())
        .then(response => {
            dispatch(addStaffs(response));
            console.log('Feedback', response);
        })
        .catch(error => { console.log('Feedback', error.message); alert('Your feedback could not be posted \n Error ' + error.message) });

};
export const patchStaff = (updateStaff) => (dispatch) => {
    return fetch(baseUrl + 'staffs', {
        method: "PATCH",
        body: JSON.stringify(updateStaff),
        headers: {
            "content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error' + response.status + ':' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            }
        )
        .then(response => response.json())
        .then(response => {
            dispatch(addStaffs(response));
            console.log('Feedback', response);
        })
        .catch(error => { console.log('Feedback', error.message); alert('Your can not update \n Error ' + error.message) });
};
export const deleteStaff = (id) => (dispatch) => {
    return fetch(baseUrl + `staffs/${id}`, {
        method: "DELETE"
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error' + response.status + ':' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            }
        )
        .then(response => response.json())
        .then(response => {
            dispatch(addStaffs(response));
            console.log('Feedback', response);
        })
        .catch(error => { console.log('Feedback', error.message); alert('Your can not delete \n Error ' + error.message) });
};