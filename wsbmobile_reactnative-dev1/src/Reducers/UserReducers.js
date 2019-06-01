import { initStateUser } from '../Globals/ReduxInitState';

// console.log( "initStateUser: ", initStateUser );

const UserReducer = ( state = initStateUser, action ) => {
    // console.log( "UserReducer:", state, action );

    if( action.type === 'SET_USER' ){
        return {
            ...state,
            user: action.data,
            isUserLoggedIn: true,
        };
    }else if( action.type === 'UNSET_USER' ){
        return {
            ...state,
            user: null,
            isUserLoggedIn: false,
        };
    }

    return state;
};

export default UserReducer;
