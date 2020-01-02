import { combineReducers } from 'redux'
import test from './TestReducer'

const indexReducer = combineReducers ({
    test:test
})
export default indexReducer