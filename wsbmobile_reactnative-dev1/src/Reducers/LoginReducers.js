import { initStateLogin } from '../Globals/ReduxInitState';

// console.log( "initStateLogin: ", initStateLogin );

const LoginReducer = ( state = initStateLogin, action ) => {
    // console.log( "LoginReducer:", state, action );

    if( action.type === 'LOGIN_START' ){
        return {
            ...state,
            isLogginIn: true
        };
    }else if( action.type === 'LOGIN_END' ){
        return {
            ...state,
            isLogginIn: false
        };
    }else if( action.type === 'LOGIN_MSG' ){
        return {
            ...state,
            logginMsg: action.msg,
            logginMsgType: action.msgType,
        };
    }else if( action.type === 'LOGIN_MSG_CLEAR' ){
        return {
            ...state,
            logginMsg: '',
            logginMsgType: '',
        };
    } 
    
    return state;
};

export default LoginReducer;
