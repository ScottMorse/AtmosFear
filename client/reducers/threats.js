export default function threats(state = [], action){
    switch(action.type){
        case 'NEW_THREAT':
            let rect
            switch(action.threatType){
                case 'ASTEROID':
                    console.log(action.threatType)
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
            return [
                ...state,
                {
                    xPos: action.xPos,
                    yPos: 0,
                    threatType: action.threatType,
                    rect
                }
            ]
        case 'FALL_THREAT':
            const stateCopy = state.slice()
            stateCopy[action.index].yPos += action.speed
            const rectY = stateCopy[action.index].rect.y
            stateCopy[action.index].rect.y = rectY.map(bound => bound + action.speed)
            return stateCopy
        default:
            return state
    }
}