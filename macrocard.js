import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { vw } from 'react-native-expo-viewport-units';
import { ScreenOrientation } from 'expo';

export default class MacroCard extends React.Component {


    constructor(props) {
        super(props)
        
    }

    render() {
        let block = 150;
        return <TouchableOpacity key={this.props.cmd} onPress={() => this.props.run(this.props.cmd)} style={{display: 'inline'}}>
            <Card style={{width: block, height: block}}>
                <Image source={{uri: this.props.img}} style={{width: block, height: block}}/>
            </Card>
            </TouchableOpacity>;
            
    }

}
