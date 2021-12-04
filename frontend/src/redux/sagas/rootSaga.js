import { takeLatest } from 'redux-saga/effects';
import { Types } from '../types';
import { handleGetUser, handleLogin, handleSignup } from './handlers/auth';

export function* watcherSaga() {
    yield takeLatest(Types.Auth.LOGIN, handleLogin);
    yield takeLatest(Types.Auth.SIGNUP, handleSignup);
    yield takeLatest(Types.Auth.GET_USER, handleGetUser);
}