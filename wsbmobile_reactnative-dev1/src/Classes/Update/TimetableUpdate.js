import fastHtmlParser from 'fast-html-parser';

import Website from '../Base/Website';


class TimetableUpdate{

    type = 'timetable';
    Website = null;

    constructor(){
        this.Website = new Website();
    }


    getHTML = async () => {

        //Set FormData ------------------
        //Get today's date -> get monday's date from it
        //Set search from - monday's date, +7 days( <- this can be set in options for e.g. +14 days or something )
        //Set other values
        



        const page = await this.Website.getPage( {
            'type': 'timetable'
        } );

        if( page === false ){
            return false;
        }

        //Cut page so the only thing left is inner <Table></Table>
        const index1 = page.indexOf( 'ctl00_ctl00_ContentPlaceHolder_RightContentPlaceHolder_dgDane' ) + 63;
        const index2 = page.indexOf( '</table>', index1 );

        const cutPage = page.substring( index1, index2 );
        return cutPage;
    }

    getDataFromHTML = async ( html ) => {

        const root = fastHtmlParser.parse( html );
        
        console.log( root );
        console.log( root.childNodes );

        const data = [];
        let first = false;
        root.childNodes.forEach( tr => {
            if( first === false ){
                first = true;
                return false;
            }
            const obj = {};

            obj['type1'] = tr.childNodes[0].childNodes[0].rawText;
            obj['date'] = tr.childNodes[1].childNodes[0].rawText;
            obj['from'] = tr.childNodes[2].childNodes[0].rawText;
            obj['to'] = tr.childNodes[3].childNodes[0].rawText;

            obj['subject'] = tr.childNodes[4].childNodes[0].childNodes[0].rawText;
            obj['teacher'] = tr.childNodes[5].childNodes[0].childNodes[0].rawText;

            obj['class'] = tr.childNodes[6].childNodes[0].rawText;
            //obj['type2'] = tr.childNodes[7].childNodes[0].rawText;
            obj['address'] = tr.childNodes[8].childNodes[0].rawText;
            obj['type3'] = tr.childNodes[9].childNodes[0].rawText;
            obj['type4'] = tr.childNodes[10].childNodes[0].rawText;

            data.push( obj );
        } );
        


        return data;
    }




}

export default TimetableUpdate;