import { AsyncStorage } from "react-native"

import axios from 'axios';
import parse5 from 'parse5';

// import Base from './Base/Base';
import Website from './Base/Website';

import { appKey, userCredentialsKey } from '../Globals/LocalStoreKeys';
import reduxGlobals from '../Globals/Redux';


// function asyncSleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

// class userClass extends Base{
class userClass{

    Website = null;

    constructor(){
        // super();
        this.Website = new Website();

    }

    getUserCredentials = async () => {
        const autoLogin = {
            login: null,
            pass: null
        };

        autoLogin.login = await AsyncStorage.getItem( appKey + userCredentialsKey + "login" );
        autoLogin.pass = await AsyncStorage.getItem( appKey + userCredentialsKey + "pass" );

        if( autoLogin.login === null || autoLogin.pass === null ){
            return false;
        }

        return autoLogin;
    }
    setUserBasedOnAutoLogin = async () => {
        const autoLogin = await this.getUserCredentials();
        if( autoLogin === false ){
            return false;
        }
        
        reduxGlobals.store.dispatch( {
            type: 'SET_USER',
            user: {
                login: autoLogin.login
            }
        } );
        return true;
    }

    logInUser = async ( userCredentials ) => {
        try{

            reduxGlobals.store.dispatch( { type: 'LOGIN_START' } );
            reduxGlobals.store.dispatch( { type: 'LOGIN_MSG_CLEAR' } );
            
            const logIn = await this.Website.logInUser( userCredentials );
            reduxGlobals.store.dispatch( { type: 'LOGIN_END' } );
            
            //Check if login correct
            if( logIn === false ){
                //SET THAT LOGIN INCORRECT
                reduxGlobals.store.dispatch( { 
                    type: 'LOGIN_MSG',
                    msg: 'WRONG!',
                    msgType: 'danger' 
                } );
                return false;
            }

            reduxGlobals.store.dispatch( { type: 'LOGIN_MSG_CLEAR' } );
            

            //TODO: use Secure Storage
            //Save user to localstorage - setMultiItems
            await AsyncStorage.setItem( appKey + userCredentialsKey + "login", userCredentials.login );
            await AsyncStorage.setItem( appKey + userCredentialsKey + "pass", userCredentials.pass );

            //Save user to redux
            reduxGlobals.store.dispatch( {
                type: 'SET_USER',
                user: {
                    login: userCredentials.login
                }
            } );
            

            return true;

        }catch( error ){
            console.log( "userClass logInUser - Error:" );
            console.error( error );

            reduxGlobals.store.dispatch( { 
                type: 'LOGIN_MSG',
                msg: 'WRONG!',
                msgType: 'danger' 
            } );
            reduxGlobals.store.dispatch( { type: 'LOGIN_END' } );
        }
    }

    logOutUser = async () => {
        try{

            const logOut = this.Website.logOutUser();
            if( logOut === false ){
                //ERROR!!!!
                console.log( "User logOutUser - Website.logOut === false!" );
                return false;
            }

            await AsyncStorage.removeItem( appKey + userCredentialsKey + "login" );
            await AsyncStorage.removeItem( appKey + userCredentialsKey + "pass" );

            reduxGlobals.store.dispatch( { type: 'UNSET_USER' } );


        }catch( error ){
            console.log( "userClass logOutUser - Error:" );
            console.error( error );
        }
    }

    autoLoginUser = async () => {
        const autoLogin = await this.getUserCredentials();
        if( autoLogin === false ){
            console.log( "userClass autoLoginUser - getUserCredentials === false" );
            return false;
        }

        const logInUser = await this.logInUser( autoLogin );
        if( logInUser === false ){
            console.log( "userClass autoLoginUser - logInUser === false" );
            return false;
        }

        return true;
    }



}

export default ( new userClass() );