import {REQUEST_TEST_DATA, SHOW_TEST_DATA, FAILED_GET_TEST_DATA, SUCCESS_TEST_DATA} from '../type/TestType'
const initialState = {
    loading: true,
    data: [],
    message: null
}
export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_TEST_DATA:
            return {
                ...state,
                loading: true
            }
        case SHOW_TEST_DATA:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case FAILED_GET_TEST_DATA:
            return {
                ...state,
                loading: false,
                message: action.payload
            }

        case SUCCESS_TEST_DATA:
            return {
                ...state,
                loading: false,
                message: action.payload
            }
        default:
            return state
    }
}