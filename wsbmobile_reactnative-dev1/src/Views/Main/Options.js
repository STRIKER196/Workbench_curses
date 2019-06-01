import React from 'react';
import { 
    StyleSheet, View, Image, Text, TouchableOpacity,
} from 'react-native';
import ImageResizeMode from 'react-native/Libraries/Image/ImageResizeMode'
import { 
    Container, Content, Grid, Row, Icon, Button,
    List, Separator, ListItem, Left, Body, Right, 
    Switch,
} from 'native-base';

import ImageGlobals from '../../Globals/Images';
import { options as OptionsGlobals } from '../../Globals/Options';

import UserClass from '../../Classes/User';


export default class OptionsView extends React.Component {

    state = {
        options: OptionsGlobals
    };

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        console.log( "OptionsView - componentDidMount" );
    }

    logOutPressed = () => {
        UserClass.logOutUser();
    }


    getOptionsJSX = () => {
        return this.state.options.map( section => {
            const options = section.options.map( option => {
                if( 'body' in option ){
                    return (
                        option.body( this )
                    );
                }

                //TODO: Remove ICON if don't have one
                return (
                    <ListItem icon key={option.optionID}>
                        <Left>
                            <Button style={{ backgroundColor: "#A34079" }}>
                                <Icon type={option.icon.type} active name={option.icon.name} />
                            </Button>
                        </Left>
                        <Body>
                            <Text>{option.title}</Text>
                        </Body>
                        <Right>
                            {option.right( this )}
                        </Right>
                    </ListItem>
                );
            } );

            return (
                <View key={'view-' + section.seperatorID}>
                    <Separator bordered style={styles.optionsSeperator} key={section.seperatorID}>
                        <Text style={styles.optionsSeperatorHeader}>{section.header}</Text>
                    </Separator>
                    { options }
                </View>
            );
        } );        
    }

    render() {
        return (       
            <Content>
                <Grid>
                    <Row>
                        <Content contentContainerStyle={{ marginTop: 6, marginBottom: 20, flexDirection: 'row', justifyContent: 'center' }}>
                            <Icon style={{ color: '#A34079', marginRight: 20, fontSize: 40 }} type="FontAwesome" active name="navicon" />
                            <Text style={{ color: '#A34079', fontSize: 30 }}>Options</Text>
                        </Content>
                    </Row>
                    <Row style={{ backgroundColor: '#f0EFF5' }}>
                        <Container style={{ height: '100%' }}>
                            <List icon style={{ backgroundColor: 'white' }}>
                                {this.getOptionsJSX()}
                            </List>
                        </Container>
                    </Row>
                </Grid>
            </Content>
        );
    }
}


const styles = StyleSheet.create({  

    optionsSeperator: {
        paddingTop: 20, 
        paddingBottom: 20,
    },
    optionsSeperatorHeader: {
        fontSize: 22,
    },

});