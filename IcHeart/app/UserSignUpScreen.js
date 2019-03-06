import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    ScrollView
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import InputContainerComp from './InputContainerComp';
import Http from './Http';


export default class UserSignUpScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }

        // this is where we do the binding
        this._onChangeUsername = this._onChangeUsername.bind(this)
        this._onChangePassword = this._onChangePassword.bind(this)
    }

    _onChangeUsername = (username) => {
        this.setState({ username: username }); // good practice for immutability
    }

    _onChangePassword(password) {
        this.setState({ password: password }); // good practice for immutability
    }

    _saveFuction = () => {
        Actions.home;
    }

    _api = () => {
        fetch('http://13.250.11.222/Project/users/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                profile: "http://13.250.11.222/Project/profiles/1/"
            }),
        }).then((response) => response.json())
        .then((responseJson) => {
            Actions.signup();
        })
            .catch((error) => {
                console.error(error);
            });

    }
    render() {

        return (
            <View style={styles.container}>
                <ScrollView>
                    <Text>Note that Username and Password are Case-Sensitive!</Text>
                    <InputContainerComp
                        rowName="Username"
                        style={styles.inputComponent}
                        onChangeText={this._onChangeUsername}
                        textValue={this.state.username}
                    />
                    <InputContainerComp
                        rowName="Password"
                        secureTextInput
                        style={styles.inputComponent}
                        onChangeText={this._onChangePassword}
                        textValue={this.state.password}
                    />
                </ScrollView>

                <Button title="Register" style={styles.button} onPress={ this._api } />
            </View>
        );
    }

    _register = () => {
        Actions.signup
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        // backgroundColor: 'red'
    },
    header: {
        // flex: 1,
        textAlign: "center",
        fontWeight: "700",
        fontSize: 24,
        paddingTop: 10
    },
    scrollViewContainer: {
        // flex: 1,
        justifyContent: 'space-around'
        // alignSelf: "stretch",
        // backgroundColor: 'blue'
    },
    inputComponent: {
        flex: 1,
        margin: 10
    },
    button: {
        // position: 'absolute',
        // bottom: 0,
        padding: 10,

    }
});
