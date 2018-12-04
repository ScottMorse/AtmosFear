import { createStore, compose } from 'redux'

import rootReducer from './reducers/index'

import { defaultShuttleRects } from './utils/utils'

const defaultState = {
    shuttle: {
        position: 0,
        rects: defaultShuttleRects,
        health: 100,
    },
    threats: [],
    game: {
        started: false,
        ended: false,
        won: false,
    }
}

export default createStore(rootReducer, defaultState)