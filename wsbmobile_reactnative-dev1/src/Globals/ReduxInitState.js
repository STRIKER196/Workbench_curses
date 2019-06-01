export const initStateLogin = {
    isLogginIn: false,
    logginMsg: '',
    logginMsgType: '',

};
export const initStateUser = {
    isUserLoggedIn: false,
    user: null,
};


export const initState = () => { return { 
    login: initStateLogin, 
    user: initStateUser 
} };