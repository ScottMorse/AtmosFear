export function startGame(){
    return {
        type: 'START_GAME'
    }
}

export function gameOver(){
    return {
        type: 'GAME_OVER'
    }
}

export function winGame(){
    return {
        type: 'GAME_WIN',
    }
}

export function levelWin(){
    return {
        type: 'LEVEL_WIN'
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

export function refillHealth(amount){
    return {
        type: 'REFILL_HEALTH',
        amount
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

export function fallThreats(){
    return {
        type: 'FALL_THREATS'
    }
}

export function deactivateThreat(id){
    return {
        type: 'DEACTIVATE_THREAT',
        id
    }
}

export function clearThreats(){
    return {
        type: 'CLEAR_THREATS'
    }
}

export function selectSound(){
    return {
        type: 'SELECT_SOUND'
    }
}

export function deselectSound(){
    return {
        type: 'DESELECT_SOUND'
    }
}