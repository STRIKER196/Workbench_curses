import React from 'react';
import { 
    StyleSheet, View, Image,
    Keyboard, KeyboardAvoidingView,
    Alert,
} from 'react-native';
import ImageResizeMode from 'react-native/Libraries/Image/ImageResizeMode'
import { 
    Container, Header, Content, 
    Button, Text, Grid, 
    Col, Row, Form, Item, Input,
    Label, Icon,
} from 'native-base';
import { connect } from 'react-redux';

import UserClass from '../Classes/User';
import ImagesGlobals from '../Globals/Images';
import { withOrientation } from 'react-navigation';


class loginView extends React.Component {

    state = {
        isKeyboard: false,
        login: '',
        pass: '',
    };

    constructor(props) {
        super(props);

    }


    componentDidMount(){
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }
    componentWillUnmount(){
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow = () => {
        this.setState( {
            isKeyboard: true
        } );
    }
    _keyboardDidHide = () => {
        this.setState( {
            isKeyboard: false
        } );
    }

    componentDidUpdate( prevProps, prevState, snapshot ){
        if( prevProps.logginMsg !== this.props.logginMsg && this.props.logginMsg !== '' ){
            this.alertMsg();
        }
    }

    alertMsg = ( logginMsg = this.props.logginMsg, logginMsgType = this.props.logginMsgType ) => {
        const alertTitles = {
            'danger': 'Błąd podczas logowania!',
        };
        const alertTitle = logginMsgType in alertTitles ? alertTitles[logginMsgType] : 'Błąd!';
        Alert.alert( alertTitle, logginMsg, [
            {
                text: 'OK'
            }
        ] );
    }
    
    logInUser = async () => {
        if( this.props.isLogginIn )
            return false;
        //
        if( this.state.login === '' || this.state.pass === '' ){
            this.alertMsg( 'Login/Hasło jest puste!', 'danger' );
            return false;
        }

        const userCredentials = {
            login: this.state.login,
            pass: this.state.pass,
        };
        UserClass.logInUser( userCredentials );
    }


    render() {
        const { isKeyboard } = this.state;
        return (       
            <Container>
                <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
                    <Grid style={{flex: 1}}>
                        { 
                            !isKeyboard &&
                            <Row style={styles.rowTop}>
                                <Image 
                                    style={styles.logoImage} 
                                    source={ ImagesGlobals.logo } 
                                    resizeMode={ImageResizeMode.center}/>
                            </Row>
                        }
                        { 
                            !isKeyboard &&
                            <Row style={styles.rowTransition}>
                                <Image 
                                    fadeDuration={0}
                                    style={styles.transitionImage} 
                                    source={ ImagesGlobals.loginTransition } 
                                    resizeMode={ImageResizeMode.stretch}/>
                            </Row>
                        }
                        <Row style={{...styles.rowForm, ...{ paddingTop: isKeyboard ? 80 : 0 }}}>
                            <Content style={styles.formContainer}>
                                <Form style={styles.form}>
                                    <Item last floatingLabel>
                                        <Label style={styles.formLabel}>Username</Label>
                                        <Input style={styles.formInput} 
                                            onChangeText={ ( text ) => this.setState( { login: text } ) }
                                            disabled={ this.props.isLogginIn }
                                            value={ this.state.login }/>
                                    </Item>
                                    <Item last floatingLabel>
                                        <Label style={styles.formLabel}>Password</Label>
                                        <Input style={styles.formInput} secureTextEntry 
                                            onChangeText={ ( text ) => this.setState( { pass: text } ) }
                                            disabled={ this.props.isLogginIn }
                                            value={ this.state.pass }/>
                                    </Item>

                                    {/* <Text style={styles.formText}>
                                        Regulamin
                                    </Text> */}

                                    <Button block light 
                                        style={{ marginTop: 30, backgroundColor: this.props.isLogginIn ? '#BEBEBE' : '#F1F1F1' }} 
                                        onPress={ this.logInUser }>
                                        <Text>Log In</Text>
                                    </Button>
                                </Form>
                            </Content>
                        </Row>
                    </Grid>
                </KeyboardAvoidingView>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLogginIn: state.login.isLogginIn,
        logginMsg: state.login.logginMsg,
        logginMsgType: state.login.logginMsgType,
      }
};
export default connect( mapStateToProps )( loginView );


const styles = StyleSheet.create({

    rowTop: {
        flex: 4,
        backgroundColor: 'white',
        zIndex: 10,
    },
    logoImage: {
        flex: 1,
        position: 'relative',
        top: 50,
        height: null,
    },

    rowTransition: {
        flex: 2,
        backgroundColor: 'white',
    },
    transitionImage: {
        flex: 1,
        height: null,
    },

    rowForm: {
        flex: 5,
        backgroundColor: '#a34079',
    },
    formContainer: {
        flex: 1, 
        paddingLeft: 30, 
        paddingRight: 30,
    },
    form: {
        flex: 1,
        justifyContent: 'center',
    },
    formLabel: {
        color: 'white',
    },
    formInput: {
        color: 'white',
    },
    formText: {
        color: 'white',
        fontSize: 8,
        marginTop: 16
    },


    
	
});