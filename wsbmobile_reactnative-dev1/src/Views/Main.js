import React from 'react';
import { connect } from 'react-redux';
import { 
	View, StyleSheet,
	ImageBackground,
} from 'react-native';
import { 
	Container, Header, Content, 
	Button, Text
} from 'native-base';
import ImageResizeMode from 'react-native/Libraries/Image/ImageResizeMode'
import Swiper from 'react-native-swiper';

import ImagesGlobals from '../Globals/Images';
import MainHeader from './Main/Header';
import OptionsView from './Main/Options'

import UserClass from '../Classes/User';
import ProfileViev from '../Globals/Profile';

class mainView extends React.Component {
	swiper = null;  
	state = {
	};
	
	componentDidMount(){
	}


	render() {
		return (
			<Container style={styles.container}>
				<Header style={styles.header} noShadow>
					<MainHeader />
				</Header>
				<Container style={styles.mainContainer}>
					<Swiper
						loop={false}
						index={1}
						loadMinimal={true}
						showsPagination={false}
						ref={component => this.swiper = component} >
						<Container>
							<Content>
								<ProfileViev />
							</Content>
						</Container>
						<Container>
							<Content>
								<Text>asdasd2</Text>
							</Content>
						</Container>
						<Container>
							<OptionsView />
						</Container>
					</Swiper>
				</Container>
			</Container>
		);
	}

}


const styles = StyleSheet.create({  
	container: {
        flex: 1,
	},
	header: {
		height: 100,
		paddingTop: 40,
		backgroundColor: 'white',
	},
	mainContainer: {
		flex: 1,
		marginTop: 20,
	}
});


const mapStateToProps = state => {
	return{
  	}
}


export default connect( mapStateToProps )( mainView );