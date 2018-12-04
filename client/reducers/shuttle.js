import { defaultShuttleRects } from '../utils/utils'

const shuttleConfig = {
    minX: -425,
    maxX: 425,
}

export default function shuttle(state = {position: 0,rects: defaultShuttleRects}, action){
    switch(action.type){
        case 'MOVE_SHUTTLE':
            const currentPos = state.position
            let newPos
            let newRects
            if(action.direction == "left"){
                newPos = currentPos - 20 > shuttleConfig.minX ? currentPos - 20 : shuttleConfig.minX
                newRects = state.rects.map(rect => {
                    return {
                        x: rect.x.map(x => x - 20),
                        y: rect.y
                    }
                })
            }
            else if(action.direction == "right"){
                newPos = currentPos + 20 < shuttleConfig.maxX ? currentPos + 20 : shuttleConfig.maxX
                newRects = state.rects.map(rect => {
                    return {
                        x: rect.x.map(x => x + 20),
                        y: rect.y
                    }
                })
            }
            else{
                return state
            }
            return {
                ...state,
                position: newPos,
                rects: newRects
            }
        case 'HIT_SHUTTLE':
            switch(action.threatType){
                case 'ASTEROID':
                    const health = state.health - 10
                    return {
                        ...state,
                        health
                    }
                default:
                    return state
            }
        default:
            return state
    }
}