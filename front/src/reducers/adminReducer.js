const adminReducer = (state = '', action) => {
    switch (action.type) {
        case 'ADMIN':
            console.log(action.payload)
            return {
                ...state, //redux state is not mutable
                isAdmin: action.payload
            }
        default:
            return state;
    }
}

export default adminReducer;