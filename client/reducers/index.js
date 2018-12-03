import { combineReducers } from 'redux'

import shuttle from './shuttle'
import threats from './threats'

export default combineReducers({
    shuttle,
    threats,
})