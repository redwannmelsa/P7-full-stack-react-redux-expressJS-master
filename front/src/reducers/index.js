import loggedReducer from "./isLogged";
import { combineReducers } from 'redux';
import toggleSignUpReducer from "./toggleSignup";
import toggleLoginReducer from "./toggleLogin";
import userReducer from "./userReducer";
import adminReducer from "./adminReducer"

const allReducers = combineReducers({
    isLogged: loggedReducer,
    toggleSignup: toggleSignUpReducer,
    toggleLogin: toggleLoginReducer,
    initUser: userReducer,
    isAdmin: adminReducer
})

export default allReducers;