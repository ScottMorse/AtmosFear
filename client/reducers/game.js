export default function shuttle(state = {started: false,ended: false,won: false}, action){
    switch(action.type){
        case 'START_GAME':
            return {
                ...state,
                started: true
            }
        case 'END_GAME':
            return {
                ...state,
                started: false,
                ended: true
            }
        case 'WIN_GAME':
            return {
                started: false,
                ended: true,
                won: true
            }
        default:
            return state
    }
}