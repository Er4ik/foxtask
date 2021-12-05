import { Types } from "../types";

export const login = payload => ({
    type: Types.Auth.LOGIN,
    payload
});

export const loginSuccess = payload => ({
    type: Types.Auth.LOGIN_SUCCESS,
    payload
});

export const loginFail = payload => ({
    type: Types.Auth.LOGIN_FAIL,
    payload
});

export const signup = payload => ({
    type: Types.Auth.SIGNUP,
    payload
});

export const signupSuccess = payload => ({
    type: Types.Auth.SIGNUP_SUCCESS,
    payload
});

export const signupFail = payload => ({
    type: Types.Auth.SIGNUP_FAIL,
    payload
});

export const getUser = payload => ({
    type: Types.Auth.GET_USER,
    payload
});

export const setUser = payload => ({
    type: Types.Auth.SET_USER,
    payload
});

export const logout = () => ({
    type: Types.Auth.LOGOUT
});

const initialState = {
    user: null,
    authToken: null,
    loginSuccess: false,
    loginError: false,
    signupSuccess: false,
    signupError: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case Types.Auth.LOGIN_SUCCESS:
            return { ...state, loginSuccess: true, loginError: false, user: action.payload.user, authToken: action.payload.authToken };
        case Types.Auth.LOGIN_FAIL:
            return { ...state, loginError: action.payload, loginSuccess: false };
        case Types.Auth.SIGNUP_SUCCESS:
            return { ...state, loginSuccess: false, loginError: false, signupSuccess: true, signupError: false };
        case Types.Auth.SIGNUP_FAIL:
            return { ...state, loginSuccess: false, loginError: false, signupSuccess: false, signupError: action.payload };
        case Types.Auth.SET_USER:
            return { ...state, user: action.payload.user, authToken: action.payload.user };
        case Types.Auth.LOGOUT:
            return { ...state, user: null, authToken: null };
        default:
            return state;
    }
};