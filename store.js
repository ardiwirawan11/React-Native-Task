import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import indexReducer from './src/redux/reducer/index';
import indexSaga from './src/redux/saga/index';

const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    return {
        ...createStore(indexReducer,
            applyMiddleware(sagaMiddleware)),
        runSaga: sagaMiddleware.run(indexSaga)
    };
};
export default configureStore;