import React from 'react';
import { connect } from 'react-redux';
import { AppLoading, Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';

import { Text, View } from 'react-native';
import { 
    Container, Content,
} from 'native-base';


import ReduxGlobals from './Globals/Redux';
import ImagesGlobals, {  } from './Globals/Images';
import UserClass from './Classes/User';


import LoginView from './Views/Login';
import MainView from './Views/Main';


class App extends React.Component {
  state = {
    isReady: false,
    isLoading: true,
  };

  async componentDidMount(){
    await UserClass.setUserBasedOnAutoLogin();
    this.setState( {
      isLoading: false
    } );
  }
  _cacheResourcesAsync = async () => {
    await Font.loadAsync( {
      'Roboto': require('../assets/fonts/Roboto.ttf'),
      'Roboto_medium': require('../assets/fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    } );
    ImagesGlobals = ImagesGlobals.map( ( image ) => {
      return Asset.fromModule( image ).downloadAsync();
    } );
    await Promise.all( ImagesGlobals );
  }

  render() {

    if( this.state.isReady === false ){
      return (
        <AppLoading
          startAsync={ this._cacheResourcesAsync }
          onFinish={ () => this.setState( { isReady: true } ) }
          onError={ () => this.setState( { isReady: true } ) }
        />
      );
    }

    if( this.state.isLoading === true ){
      return (
        <Text></Text>
      );
    }

    return (
        <Container style={{padding: 0, margin: 0}}>
            { !this.props.isUserLoggedIn ? <LoginView /> : <MainView /> }
        </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    isUserLoggedIn: state.user.isUserLoggedIn
  }
}

export default connect( mapStateToProps )( App );