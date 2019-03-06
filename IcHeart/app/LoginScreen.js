import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Button
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import InputContainerComp from './InputContainerComp'

import Http from './Http.js'


export default class LoginScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            loginError: false
        }

        // this is where we do the binding
        this._onChangeUsername = this._onChangeUsername.bind(this)
        this._onChangePassword = this._onChangePassword.bind(this)
    }

    _onChangeUsername = (username) => {
        this.setState({username: username}); // good practice for immutability
    }

    _onChangePassword(password) {
        this.setState({password: password}); // good practice for immutability
    }

    _auth = () => {
        var jsonData = JSON.stringify({
            "username": this.state.username,
            "password": this.state.password
        })

        fetch('http://13.250.11.222/Project/user/login', {
            method: 'POST',
            body: jsonData,
        })
            .then((response) => {

                var isAuth = false;
                response.status == 201 ? Actions.homeScreen() : this.setState({ loginError: true })

            })
            .catch((error) => {
                console.log(error)

            });
       
    }

    render() {
        return (
            <View style={styles.containerMain}>
                <View style={styles.containerTop}>
                    <Image
                        source= {require('./images/rsz_logo2.png')}
                        style={{ width: 200, height: 200 }}
                    />
                </View>
                <View style={styles.containerBottom}>
                    <Text>Note that Username and Password are Case-Sensitive!</Text>
                    <InputContainerComp
                        rowName="Username"
                        onChangeText={this._onChangeUsername}
                        textValue={this.state.username}
                    />
                    <InputContainerComp
                        rowName="Password"
                        secureTextInput
                        onChangeText={this._onChangePassword}
                        textValue={this.state.password}
                    />
                    <Button
                        onPress={Actions.userSignUpScreen}
                        title="Register"
                    />
                    {this.state.loginError ? <Text style={{color: 'red'}}>Invalid Username or Password. Please try again!</Text> : null}
                    <View style={styles.loginButton}>
                    <Button
                        onPress={this._auth}
                        title="Login"
                    />
                    </View>
                </View>
            </View>
            
        );
    }
}


const styles = StyleSheet.create({
    containerMain: {
        flex: 1,
    },
    containerTop: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerBottom: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginButton: {
        width: '100%',
        flex: 1,
        justifyContent: 'flex-end',
    }
});
