import { combineReducers } from 'redux'

import shuttle from './shuttle'
import threats from './threats'
import game from './game'
import level from './level'
import sound from './sound'

export default combineReducers({
    shuttle,
    threats,
    level,
    game,
    sound
})