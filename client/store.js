import { createStore, compose } from 'redux'

import rootReducer from './reducers/index'

import { defaultShuttleRects } from './utils/utils'

const defaultState = {
    shuttle: {
        position: 0,
        rects: defaultShuttleRects,
        health: 100,
        damageTotal: 0,
    },
    threats: [],
    game: {
        active: false,
        ended: false,
        gameOver: false,
        gameWin: false,
        level: 1,
    },
    sound: {
        selected: false
    }
}

export default createStore(rootReducer, defaultState)