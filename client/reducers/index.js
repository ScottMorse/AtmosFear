import { combineReducers } from 'redux'

import shuttle from './shuttle'
import threats from './threats'
import game from './game'
import sound from './sound'

export default combineReducers({
    shuttle,
    threats,
    game,
    sound
})