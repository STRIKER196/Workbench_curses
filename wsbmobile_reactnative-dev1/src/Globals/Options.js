import React from 'react';
import { 
    Text, TouchableOpacity,
} from 'react-native';
import { 
    ListItem, Body, Button, Switch
} from 'native-base';


export const options = [
    {
        seperatorID: "data-options",
        header: "Data Options",
        options: [
            {
                optionID: 'auto-update',
                title: "Auto Update",
                icon: { type: "MaterialCommunityIcons", name: "update" },
                right: props => ( 
                    <Switch value={false} />
                )                
            }
        ]
    },
    {
        seperatorID: "user-options",
        header: "User Options",
        options: [
            {
                optionID: 'clear-users-data',
                title: "Clear other user's data",
                icon: { type: "FontAwesome", name: "users" },
                right: props => ( 
                    <TouchableOpacity>
                        <Text>Clear</Text>
                    </TouchableOpacity>
                )
            },
            {
                body: props => (
                    <ListItem key="logout">
                        <Body>
                            <Button block danger onPress={ props.logOutPressed }>
                                <Text style={{ color: 'white' }}>Logout</Text>
                            </Button>
                        </Body>
                    </ListItem>
                )
            }
        ]
    }
];
