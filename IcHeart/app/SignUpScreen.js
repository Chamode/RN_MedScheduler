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


export default class SignUpScreen extends Component {
    _saveFuction = () => {
        Actions.home;
    }
    render() {

        return (
            <View style={styles.container}>
                <ScrollView>
                    <InputContainerComp rowName="IC Number" style={styles.inputComponent} returnKey={'next'} />
                    <InputContainerComp rowName="Address" style={styles.inputComponent} />
                    <InputContainerComp rowName="Age" style={styles.inputComponent}
                    />
                    <InputContainerComp rowName="Weight" style={styles.inputComponent}
                    />
                    <InputContainerComp rowName="Height" style={styles.inputComponent} />
                    <InputContainerComp rowName="Health History" style={styles.inputComponent} />

                </ScrollView>

                <Button title="Submit" style={styles.button} onPress={Actions.homeScreen} />
            </View>
        );
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
