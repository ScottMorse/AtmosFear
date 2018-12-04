import { combineReducers } from 'redux'

import shuttle from './shuttle'
import threats from './threats'
import game from './game'

export default combineReducers({
    shuttle,
    threats,
    game
})