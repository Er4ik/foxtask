import { put } from "@redux-saga/core/effects";
import { loginFail, loginSuccess, setUser, signupFail, signupSuccess } from '../../ducks/auth';
import axios from "axios";
import jwt_decode from "jwt-decode";

export function* handleLogin({ payload }) {
    try {
        const res = yield axios.post('http://api.foxtask.xyz:3000/login', payload);
        const decoded = jwt_decode(res.data);
        yield put(loginSuccess({ user: { email: decoded.email, name: decoded.name }, authToken: res.data }));
        localStorage.setItem('Auth', res.data);
    } catch (ex) {
        yield put(loginFail(ex));
    }
}

export function* handleSignup({ payload }) {
    try {
        yield axios.post('http://api.foxtask.xyz:3000/user', payload);
        yield put(signupSuccess());
    } catch (ex) {
        yield put(signupFail(ex));
    }
}

export function* handleGetUser() {
    const authToken = localStorage.getItem('Auth');
    if (authToken) {
        const decoded = jwt_decode(authToken);
        yield put(setUser({ user: { email: decoded.email, name: decoded.name }, authToken: authToken }));
    }
}

export function* handleLogout() {
    localStorage.removeItem('Auth');
}