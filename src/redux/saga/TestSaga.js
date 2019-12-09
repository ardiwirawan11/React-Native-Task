import { put, call } from 'redux-saga/effects'
import {SHOW_TEST_DATA, FAILED_GET_TEST_DATA, SUCCESS_TEST_DATA} from '../type/TestType';
import { apiGetData } from './api/ApiTest';
export function* getData() {
    try {
        const Test = yield call(apiGetData)
        yield put({ type: SHOW_TEST_DATA, payload: Test })
        yield put({ type: SUCCESS_TEST_DATA, payload: 'Successfully get ' })
    } catch (error) {
        yield put({ type: FAILED_GET_TEST_DATA, payload: 'Fatal ERROR' })
    }
}

