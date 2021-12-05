import { Types } from "../types";

export const getTasks = () => ({
    type: Types.Tasks.GET_TASKS
});

export const getTasksFail = payload => ({
    type: Types.Tasks.GET_TASKS_FAIL,
    payload
});

export const setTasks = payload => ({
    type: Types.Tasks.SET_TASKS,
    payload
});

export const createTask = payload => ({
    type: Types.Tasks.CREATE_TASK,
    payload
});

export const createTaskFail = payload => ({
    type: Types.Tasks.CREATE_TASK_FAIL,
    payload
});

export const createTaskSuccess = payload => ({
    type: Types.Tasks.CREATE_TASK_SUCCESS,
    payload
});

const initialState = {
    tasks: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case Types.Auth.SET_TASKS:
            return { ...state, tasks: action.payload };
        default:
            return state;
    }
};