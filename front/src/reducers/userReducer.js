const userReducer = (state = '', action) => {
    switch (action.type) {
        case 'USER':
            return {
                ...state, //redux state is not mutable
                userId: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;