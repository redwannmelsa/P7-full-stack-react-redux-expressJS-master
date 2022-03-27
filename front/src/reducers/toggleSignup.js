const toggleSignUpReducer = (state = false, action) => {
    switch(action.type) {
        case 'SIGNUP_PAGE':
            return !state; // returns showsignup = true
        default:
            return state;
    }
}

export default toggleSignUpReducer;