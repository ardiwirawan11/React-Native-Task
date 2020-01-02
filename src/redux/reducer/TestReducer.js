import {REQUEST_TEST_DATA, SHOW_TEST_DATA, FAILED_GET_TEST_DATA, SUCCESS_TEST_DATA} from '../type/TestType'
const initialState = {
    loading: true,
    data: [
        {provider_id : 1, day_of_week: 1, start_time:1, tier:1, pax: 1, discount: 1, active:1},
        {provider_id : 2, day_of_week: 1, start_time:1, tier:1, pax: 1, discount: 1, active:1},
        {provider_id : 2, day_of_week: 2, start_time:2, tier:2, pax: 2, discount: 2, active:1},
        {provider_id : 3, day_of_week: 3, start_time:3, tier:3, pax: 3, discount: 3, active:1},
        {provider_id : 4, day_of_week: 4, start_time:4, tier:4, pax: 4, discount: 4, active:1},
        {provider_id : 5, day_of_week: 5, start_time:5, tier:5, pax: 5, discount: 5, active:1},
        {provider_id : 6, day_of_week: 6, start_time:6, tier:6, pax: 6, discount: 6, active:1},
        {provider_id : 0, day_of_week: 0, start_time:0, tier:0, pax: 0, discount: 0, active:1}],
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