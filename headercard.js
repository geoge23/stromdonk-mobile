import React from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import { Card, Paragraph, Button, HelperText, TextInput } from 'react-native-paper';


export default class HeaderCard extends React.Component {
    state = {
        code: false,
    }

    render() {
        return <Card style={{margin: 10}}>
            <Card.Title title="Let's get started!"/>
            <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                <Image source={require("./assets/phone.gif")} style={{height: 160, width: 160}}/>
            </View>
            <Card.Content>
                <Paragraph>
                    It looks like you might not be connected to your desktop. Chuck your connection code into the box below, we promise it's easy!
                </Paragraph>
                <TextInput label="Code" dense={true} style={{marginHorizontal: "25%", marginVertical: 10}} onChangeText={(text) => this.setState({
                    code: text
                })}>
                </TextInput>
                <Card.Actions>
                    <TouchableOpacity>
                        <Button mode="contained" icon="wifi" onPress={() => this.props.connectToServer(this.state.code)}>Connect</Button>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Button icon="help">Help!</Button>
                    </TouchableOpacity>
                </Card.Actions>
            </Card.Content>
        </Card>
    }
}