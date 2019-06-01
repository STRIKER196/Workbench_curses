import { isObject } from 'util';
import axios from 'axios';
import parse5 from 'parse5';
import fastHtmlParser from 'fast-html-parser';

import { getInputFromHTMLElement } from '../../Lib/Libs.js';

const getPageReturn = {
    HTML: 'getPageReturn_HTML',
    Object: 'getPageReturn_Object'
};

let connectionCount = 0;
let connectionSize = 0;

class Website{

    loginUrl = 'https://wu.wsb.edu.pl/wu/Logowanie2.aspx';
    sessionUrl = 'https://wu.wsb.edu.pl/wu/Ogloszenia.aspx';
    logOutUrl = 'https://wu.wsb.edu.pl/wu/Wyloguj.aspx';

    dataUrls = {
        'login': 'https://wu.wsb.edu.pl/wu/Logowanie2.aspx',
        'timetable': 'https://wu.wsb.edu.pl/wu/PodzGodzin.aspx',
    };


    consoleLogConnection = () => {
        console.log( "Connection: ", { count: connectionCount, size: connectionSize } );
    }

    pageCorrect = ( headers ) => {
        if( !isObject( headers ) || 
            !( 'set-cookie' in headers ) || 
            headers['set-cookie'][0].indexOf( '.ASPXUSERWU=' ) === -1 ){
            return false;
        }
        return true;
    }


    getPage = async ( args ) => {
        try{

            if( !( args.type in this.dataUrls ) ){
                console.log( `Website getPage - type(${args.type}) not in dataUrls!` );
                return false;
            }

            const con = await axios( {
                method: 'method' in args ? args['method'] : 'get',
                url: this.dataUrls[args.type],
                data: 'formData' in args ? args['formData'] : null,
            } );
            ++connectionCount;
            connectionSize += parseInt( 'content-length' in con.headers ? con.headers['content-length'] : 0 );

            // console.log( "Website getPage - con: " );
            // console.log( con.data );
            // console.log( con.status );
            // console.log( con.statusText );
            // console.log( con.headers );
            // console.log( con.config );

            if( 'checkPageCorrect' in args && args['checkPageCorrect'] === true ){
                if( this.pageCorrect( con.headers ) === false ){
                    return false;
                }
            }

            //getPageReturn
            if( !( 'return' in args ) || args.return === getPageReturn.HTML ){
                return con.data;
            }else if( args.return === getPageReturn.Object ){
                return {
                    html: con.data,
                    headers: con.headers
                };
            }

            return con.data;

        }catch( error ){
            console.log( "Website getPage - Error: " );
            console.error( error );

            return false;
        }
    }

    checkSession = async () => {
        try{
            const conFirst = await axios.get( this.sessionUrl );
            ++connectionCount;
            connectionSize += parseInt( 'content-length' in conFirst.headers ? conFirst.headers['content-length'] : 0 );

            // console.log( "Website checkSession - conFirst: " );
            // console.log( conFirst.data );
            // console.log( conFirst.status );
            // console.log( conFirst.statusText );
            // console.log( conFirst.headers );
            // console.log( conFirst.config );

            return this.pageCorrect( conFirst.headers );

        }catch( error ){
            console.log( "Website checkSession - Error: " );
            console.error( error );

            return false;
        }
    }

    logInUser = async ( userCredentials ) => {
        try{
            //TODO: check if can be done in one call
            const conFirstHtml = await this.getPage( {
                type: 'login'
            } );

            const root = fastHtmlParser.parse( conFirstHtml );
            const viewStateElement = root.querySelector( '#__VIEWSTATE' );
            if( viewStateElement === null ){
                console.log( "Website logInUser - viewState not found" );
                return false;
            }
            
            const viewState = getInputFromHTMLElement( viewStateElement );
            if( viewState === false ){
                console.log( "Website logInUser - viewState element is wrong" );
                return false;
            }

            const dataObj = {
                "__EVENTTARGET": "",
                "__EVENTARGUMENT": "",
                // "__LASTFOCUS": "__LASTFOCUS",
                "__VIEWSTATE": viewState,
                // "__EVENTVALIDATION": "__EVENTVALIDATION",

                "ctl00_ctl00_TopMenuPlaceHolder_TopMenuContentPlaceHolder_MenuTop3_menuTop3_ClientState": "__EVENTTARGET",
                "ctl00_ctl00_ScriptManager1_HiddenField": "__EVENTTARGET",

                "ctl00$ctl00$ContentPlaceHolder$MiddleContentPlaceHolder$txtIdent": userCredentials.login,
                "ctl00$ctl00$ContentPlaceHolder$MiddleContentPlaceHolder$txtHaslo": userCredentials.pass,
                "ctl00$ctl00$ContentPlaceHolder$MiddleContentPlaceHolder$butLoguj": "Zaloguj",
                "ctl00$ctl00$ContentPlaceHolder$MiddleContentPlaceHolder$rbKto": "student",
            };

            const formData = new FormData();
            formData.append( "__EVENTTARGET", "" );
            formData.append( "__EVENTARGUMENT", "" );
            formData.append( "__EVENTTARGET", "" );
            
            formData.append( "__EVENTTARGET", "" );
            formData.append( "__EVENTTARGET", "" );
            
            formData.append( "__EVENTTARGET", "" );
            formData.append( "__EVENTTARGET", "" );
            formData.append( "__EVENTTARGET", "" );
            formData.append( "__EVENTTARGET", "" );

            Object.keys( dataObj ).forEach( key => {
                formData.append( key, dataObj[key] );
            } );

            
            const conSecond = await this.getPage( {
                type: 'login',
                method: 'post',
                return: getPageReturn.Object,
                formData
            } );
            
            //Check if login correct
            if( this.pageCorrect( conSecond.headers ) === false ){
                console.log( "Website logInUser - pageCorrect( conSecond ) === false " );
                return false;
            }

            return true;

        }catch( error ){
            console.log( "Website logInUser - Error: " );
            console.error( error );

            return false;
        }
    }

    logOutUser = async () => {
        try{
            const conFirst = await axios.get( this.logOutUrl );
            ++connectionCount;
            connectionSize += parseInt( 'content-length' in conFirst.headers ? conFirst.headers['content-length'] : 0 );

            // console.log( "Website logOutUser - conFirst: " );
            // console.log( conFirst.data );
            // console.log( conFirst.status );
            // console.log( conFirst.statusText );
            // console.log( conFirst.headers );
            // console.log( conFirst.config );

            return true;

        }catch( error ){
            console.log( "Website logOutUser - Error:" );
            console.error( error );

            return false;
        }
    }





}


export default Website;
