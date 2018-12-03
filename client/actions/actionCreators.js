export function moveShuttle(direction){
    return {
        type: 'MOVE_SHUTTLE',
        direction
    }
}

export function newThreat(xPos,threatType){
    return {
        type: 'NEW_THREAT',
        xPos,
        threatType
    }
}

export function fallThreat(speed,index){
    return {
        type: 'FALL_THREAT',
        speed,
        index
    }
}