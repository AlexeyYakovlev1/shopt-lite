export default function loggedReducer(state=[], action) {
    switch(action.type) {
        case 'SIGN_IN':
            return [...state, action.payload];
        case 'LOG_OUT':
        	state = [];
        	
            return [...state];
        default:
            return state;
    }
}