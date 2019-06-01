import React from 'react';
import { 
    StyleSheet, View, Image, Text, TouchableOpacity,
} from 'react-native';
import ImageResizeMode from 'react-native/Libraries/Image/ImageResizeMode'
import { 
    Container, Content, Grid, Col, Icon,
} from 'native-base';

import ImageGlobals from '../../Globals/Images';

export default class MainHeader extends React.Component {

    state = {
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (       
            <Container style={styles.container}>
                <Grid style={{ flex: 1 }}>
                    <Col style={{ flex: 1 }}>
                        <Content contentContainerStyle={{ flex: 1, alignItems: 'center' }}>
                            <Image 
                                source={ImageGlobals.logo}
                                style={styles.logoImage}
                                resizeMode={ImageResizeMode.center}/>
                        </Content>
                    </Col>
                    <Col style={{ flex: 1, justifyContent: 'center' }}>
                        <Content contentContainerStyle={{ flex: 1, flexDirection: 'row', justifyContent: 'center', position: 'relative', top: 10, left: 10 }}>
                            <TouchableOpacity>
                                <Icon type="FontAwesome" name="user" style={styles.icon} />
                            </TouchableOpacity>  
                            <TouchableOpacity>
                                <Icon type="FontAwesome" name="calendar-o" style={styles.icon} />
                            </TouchableOpacity>  
                            <TouchableOpacity>
                                <Icon type="FontAwesome" name="navicon" style={styles.icon} />
                            </TouchableOpacity>    
                        </Content>
                    </Col>
                </Grid>
            </Container>
        );
    }
}


const styles = StyleSheet.create({  
	container: {
        flex: 1,
    },
    logoImage: {
        width: 200,
        height: 60,
    },
    icon: {
        color: '#A34079', 
        fontSize: 40,
        paddingRight: 20,
    },
});