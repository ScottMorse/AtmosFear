export default function level(state=1,action){
    switch(action.type){
        case 'LEVEL_UP':
            return state + 1
        default:
            return state
    }
}