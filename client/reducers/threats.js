import { userInfo } from "os";

let id = 0
export default function threats(state = [], action){
    let index
    switch(action.type){
        case 'NEW_THREAT':
            let rect
            switch(action.threatType){
                case 'ASTEROID':
                    rect = {
                        x:[action.xPos - 25, action.xPos + 25],
                        y:[0,50]
                    }
                    break
                default:
                    rect = {
                        x:[-25,25],
                        y:[0,50]
                    }
            }
            id++
            return [
                ...state,
                {
                    xPos: action.xPos,
                    yPos: 0,
                    threatType: action.threatType,
                    rect,
                    id
                }
            ]
        case 'FALL_THREAT':
            state.forEach((threat,i) => {
                if(threat.id == action.id){
                    index = i
                }
            })
            state[index].yPos += action.speed
            const rectY = state[index].rect.y
            state[index].rect.y = rectY.map(bound => bound + action.speed)
            return state
        case 'FALL_THREATS':
            return state.slice().reduce((threats,threat) => {
                threat.yPos += 20 //speed
                threat.rect.y = threat.rect.y.map(bound => bound + 20)
                threats.push(threat)
                return threats
            },[])
        case 'DEACTIVATE_THREAT':
            state.forEach((threat,i) => {
                if(threat.id == action.id){
                    index = i
                }
            })
            state.splice(index,1)
            return state
        default:
            return state
    }
}