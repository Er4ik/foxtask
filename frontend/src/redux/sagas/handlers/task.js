import { put, select } from "@redux-saga/core/effects";
import axios from "axios";
import { createTaskFail, getTasksFail, setTasks } from "../../ducks/task";

export function* handleGetTasks() {
    try {
        const authToken = yield select(state => state.auth.authToken);
        const res = yield axios.get('http://api.foxtask.xyz:3000/task', {
            headers: {
                'Authorization': `bearer ${authToken}`
            }
        });

        yield put(setTasks(res.data));
    } catch (ex) {
        yield put(getTasksFail(ex));
    }
}

export function* handleCreateTask() {
    try {

    } catch (ex) {
        yield put(createTaskFail(ex));
    }
}