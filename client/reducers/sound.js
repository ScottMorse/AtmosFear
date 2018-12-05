export default function sound(state = {selected: false}, action){
    switch(action.type){
        case 'SELECT_SOUND':
            return {...state, selected: true}
        case 'DESELECT_SOUND':
            return {...state, selected: false}
        default:
            return state
    }
}