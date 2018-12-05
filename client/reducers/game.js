export default function game(state = {
    active: false,
    started: false,
    ended: false,
    gameOver: false,
    gameWin: false,
    level: 1,
}, action){
    switch(action.type){
        case 'START_GAME':
            return {
                ...state,
                active: true,
                started: true
            }
        case 'GAME_OVER':
            return {
                ...state,
                active: false,
                gameOver: true,
                ended: true,
            }
        case 'GAME_WIN':
            return {
                ...state,
                active: false,
                gameWin: true,
                ended: true,
            }
        case 'LEVEL_WIN':
            return {
                ...state,
                active: false,
                level: state.level + 1
            }
        default:
            return state
    }
}