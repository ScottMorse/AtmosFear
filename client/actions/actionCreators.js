export function startGame(){
    return {
        type: 'START_GAME'
    }
}

export function endGame(status){
    return {
        type: 'END_GAME',
        status
    }
}

export function winGame(status){
    return {
        type: 'WIN_GAME',
        status
    }
}


export function moveShuttle(direction){
    return {
        type: 'MOVE_SHUTTLE',
        direction
    }
}

export function hitShuttle(threatType){
    return {
        type: 'HIT_SHUTTLE',
        threatType
    }
}

export function newThreat(xPos,threatType){
    return {
        type: 'NEW_THREAT',
        xPos,
        threatType
    }
}

export function fallThreat(speed,id){
    return {
        type: 'FALL_THREAT',
        speed,
        id
    }
}

export function deactivateThreat(id){
    return {
        type: 'DEACTIVATE_THREAT',
        id
    }
}