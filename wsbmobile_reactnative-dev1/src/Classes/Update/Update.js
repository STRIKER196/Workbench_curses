
import Website from '../Base/Website';
import UserClass from '../User';


class Update{

    Website = null;
    constructor(){
        this.Website = new Website();

    }

    checkSession = async () => {
        const session = await this.Website.checkSession();
        if( session === false ){
            console.log( "Session wrong, attempt to log in user" );

            //Login user, get credentials
            const userCredentials = await UserClass.getUserCredentials();
            if( userCredentials === false ){
                console.log( "No user credentials" );
                return false;
            }

            //Login user
            if( await this.Website.logInUser( userCredentials ) === false ){
                console.log( "Cannot LogIn User!" );
                return false;
            }
        }

        console.log( "Session ok" );
        return true;
    }

    update = async ( factory ) => {
        console.log( "\n\n--Update with factory " + factory.type );

        if( await this.checkSession() === false ){
            return false;
        }
        
        console.log( "Get HTML" );

        //Get HTML from website
        const html = await factory.getHTML();
        console.log( "HTML: ", html );


        console.log( "Transform HTML to data" );
        //Transform HTML to format that is used in local storage
        const data = await factory.getDataFromHTML( html );

        console.log( "Data: ", data );

    }


}

export default ( new Update() );