import { createStore, combineReducers } from 'redux';

import { initState } from './ReduxInitState';

import UserReducers from '../Reducers/UserReducers';
import LoginReducers from '../Reducers/LoginReducers';

class reduxGlobals{

    store = null;


    constructor(){
        const reducers = combineReducers( {
            login: LoginReducers,
            user: UserReducers,
        } );
        this.store = createStore( reducers, initState() );
    }

}

export default ( new reduxGlobals() );


