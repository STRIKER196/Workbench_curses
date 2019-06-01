import ReduxGlobals from '../../Globals/Redux';

export default class reduxWrapper{

    store = null;

    constructor(){
        this.store = ReduxGlobals.store;
        
    }



}



