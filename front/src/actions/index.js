export const loggedIn = () => {
    return {
        type:'SIGN_IN'
    }
}

export const logOff = () => {
    return {
        type: 'SIGN_OFF'
    }
}

export const toggleLogin = () => {
    return {
        type: 'LOGIN_PAGE'
    }
}

export const toggleSignup = () => {
    return {
        type: 'SIGNUP_PAGE'
    }
}

export const storeUserId = (userId) => {
    return {
        type: 'USER',
        payload: userId
    }
}

export const isAdmin = (admin) => {
    return {
        type: 'ADMIN',
        payload: admin
    }
}