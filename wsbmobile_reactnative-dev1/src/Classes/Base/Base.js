// import reduxWrapper from './StateManager/Redux';
import LocalStorage from './LocalStorage';
import ReduxWrapper from './ReduxWrapper';

export default class baseClass{
    type = 'base';

    localStorage = null;
    reduxWrapper = null;

    constructor(){
        this.localStorage = new LocalStorage();
        this.reduxWrapper = new ReduxWrapper();

    }

}

