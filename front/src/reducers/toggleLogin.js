const toggleLoginReducer = (state = false, action) => {
    switch(action.type) {
        case 'LOGIN_PAGE':
            return !state; // returns showsignup = true
        default:
            return state;
    }
}

export default toggleLoginReducer;