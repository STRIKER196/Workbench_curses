import React from 'react';
import { connect } from 'react-redux';
import { Text, TextInput, Button, View, TouchableOpacity } from 'react-native';

import UserClass from '../Classes/User';

//TEMP
import Update from '../Classes/Update/Update';
import TimetableUpdate from '../Classes/Update/TimetableUpdate';


class loginView extends React.Component {
  state = {
    login: '',
    pass: '',
  };

  logInUser = async () => {
    UserClass.logInUser( this.state );

  }

  //TEMP
  updateTimetable = async () => {
    console.log( "loginView updateTimetable - START:" );
    Update.update( new TimetableUpdate() );

  }


  render() {
    return (
      <View>
        <Text>Login:</Text>

        <TextInput
          style={{ height: 40 }}
          placeholder="Login"
          onChangeText={ ( text ) => this.setState( { login: text } ) }
          value={ this.state.login }
        />
        <TextInput
          style={{ height: 40 }}
          placeholder="Password"
          onChangeText={ ( text ) => this.setState( { pass: text } ) }
          secureTextEntry={ true }
          value={ this.state.pass }
        />
        <Button
          onPress={ () => {
            this.logInUser();
          } }
          title="Sign in"
          disabled={ this.props.isLogginIn }
        />


        <TouchableOpacity 
          onPress={ () => { this.updateTimetable(); } }
          style={{ marginTop: 40, padding: 20, backgroundColor: '#adadad' }}>
          <Text>Get Update</Text>
        </TouchableOpacity>
        
        { 
          this.props.logginMsg != '' && 
          <Text>
            { this.props.logginMsgType + ': ' + this.props.logginMsg }
          </Text> 
        }

      </View>
    );
  }

}


const mapStateToProps = state => {
  return {
    isLogginIn: state.login.isLogginIn,
    logginMsg: state.login.logginMsg,
    logginMsgType: state.login.logginMsgType,
  }
}


export default connect( mapStateToProps )( loginView );