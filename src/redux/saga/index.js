import { all, takeLatest } from 'redux-saga/effects';
import { REQUEST_TEST_DATA } from '../type/TestType';
import { getData } from './TestSaga';

export default function* indexSaga() {
    yield all([takeLatest(REQUEST_TEST_DATA, getData)]);
}
