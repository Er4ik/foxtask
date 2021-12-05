import createSagaMiddleware from "@redux-saga/core";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import logger from "redux-logger";
import authReducer from './ducks/auth';
import taskReducer from './ducks/task';
import { watcherSaga } from "./sagas/rootSaga";

const reducers = combineReducers({
    auth: authReducer,
    task: taskReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducers,
    {},
    composeEnhancers(applyMiddleware(sagaMiddleware, logger))
);

sagaMiddleware.run(watcherSaga);

export default store;