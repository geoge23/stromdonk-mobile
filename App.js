import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image } from 'react-native';
import Header from './header.js';
import HeaderCard from './headercard.js';
import MacroCard from './macrocard.js';
import { ScreenOrientation } from 'expo';

const io = require('socket.io-client');
const socket = io('https://stromdonk.herokuapp.com');

export default class App extends React.Component {
	state = {
		connected: false,
		macros: null
	};

	constructor(props) {
		super(props);
		this.connect = this.connect.bind(this);
	}

	connect(num) {
		socket.emit('mobile-initiate', parseInt(num));
	}

	renderMacros = () => {
		let res = [];
		for (let macro in this.state.macros) {
			res.push(<MacroCard
				key={this.state.macros[macro].cmd}
				img={this.state.macros[macro].img}
				cmd={this.state.macros[macro].cmd}
				run={(data) => this.openMacro(data)}
			/>);
		}
		return res;
	}

	openMacro(command) {
		socket.emit('command', command);
	}

	componentDidMount() {
		//runs when server connects mobile and desktop
		socket.on('mobile-initiate-success', (data) => {
			if (data.status) {
				console.log('connection successful');
				//this requests macros from desktop, which are then sent
				socket.emit('request-macros');
			} else {
				console.log('failure');
			}
		});

		//runs when macros are sent
		socket.on('send-macros', (data) => {
			let macros = JSON.parse(data);
			ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
			this.setState({
				connected: true,
				macros: macros
			});
		});

		socket.on('disconnect', () => {
			this.setState({ connected: false });
			ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
		});
	}
	render() {
		return (
			<SafeAreaView style={{ height: '100%', width: '100%' }}>
				<Header />
				<ScrollView>
					{this.state.connected && this.state.macros ? (
						[
							Object.keys(this.state.macros).length === 0 ? (
								<Text>Nothing here yet</Text>
							) : (
								<View style={{flex: 1, flexDirection: 'row', marginVertical: 'auto', justifyContent: 'center', flexWrap: 'wrap'}}>
									{this.renderMacros(this.state.macros)}
								</View>
							)
						]
					) : (
						<HeaderCard connectToServer={this.connect} />
					)}
				</ScrollView>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({});
