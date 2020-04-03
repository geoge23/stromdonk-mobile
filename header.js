import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import { SvgUri } from 'react-native-svg';

export default class Header extends React.Component {
    state = {
        fontsLoaded: false,
    }
    styles = StyleSheet.create({
        view: {
            width: "100%",
            height: "10%", 
            backgroundColor: "#fff"
        },
        text: {
            fontFamily: "montserratlt",
            textAlign: "center",
            letterSpacing: 3,
            fontSize: 25,
            textTransform: "uppercase",
            marginTop: "auto",
            marginBottom: "auto",
        }
    })
    async componentDidMount() {
        await Font.loadAsync({
            montserrat: require('./assets/fonts/Montserrat-Regular.ttf'),
            montserratsb: require('./assets/fonts/Montserrat-SemiBold.ttf'),
            montserratlt: require('./assets/fonts/Montserrat-Light.ttf'),
        })

        this.setState({fontsLoaded: true})
    }
    render() {
        return this.state.fontsLoaded ? (
            <View style={this.styles.view}>
                <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center", height: "100%"}}>
                    <SvgUri 
                        width="30"
                        height="30"
                        uri="https://svgshare.com/i/Jce.svg"
                        color="black"
                        style={{marginRight: 8}}          
                    />
                    <Text style={this.styles.text}>Stromdonk</Text>
                </View>
            </View>
            
        ) : null; 
    }
}