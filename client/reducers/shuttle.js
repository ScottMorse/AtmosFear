import { defaultShuttleRects } from '../utils/utils'

const shuttleConfig = {
    minX: -425,
    maxX: 425,
}

export default function shuttle(state = {position: 0,rects: defaultShuttleRects,health: 100,damageTotal: 0}, action){
    let withinBounds
    let health
    switch(action.type){
        case 'MOVE_SHUTTLE':
            const currentPos = state.position
            let newPos
            let newRects
            if(action.direction == "left"){
                withinBounds = currentPos - 20 > shuttleConfig.minX
                newPos = withinBounds ? currentPos - 20 : shuttleConfig.minX
                newRects = withinBounds ? state.rects.map(rect => {
                    return {
                        x: rect.x.map(x => x - 20),
                        y: rect.y
                    }
                }) : state.rects
            }
            else if(action.direction == "right"){
                withinBounds = currentPos + 20 < shuttleConfig.maxX
                newPos = withinBounds ? currentPos + 20 : shuttleConfig.maxX
                newRects = withinBounds ? state.rects.map(rect => {
                    return {
                        x: rect.x.map(x => x + 20),
                        y: rect.y
                    }
                }) : state.rects
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
            let damageTotal
            switch(action.threatType){
                case 'ASTEROID':
                    health = state.health - 10
                    damageTotal = state.damageTotal + 10
                    break
                case 'LASER':
                    health = state.health - 20
                    damageTotal = state.damageTotal + 20
                    break
                default:
                    return state
            }
            return {
                ...state,
                health,
                damageTotal
            }
        case 'REFILL_HEALTH':
            health = state.health + action.amount
            if(health > 100) health = 100
            return {
                ...state,
                health
            }
        default:
            return state
    }
}