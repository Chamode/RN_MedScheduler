import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    Easing
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Drawer, { ControlPanel, MainView } from 'react-native-drawer';

import InputContainerComp from './InputContainerComp'
import DrawerPanel from './DrawerPanel'
import HomeScreen from './HomeScreen'


export default class MainContainerScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isDrawerOpen: false,
        };
    }

    render() {
        return (
            <Drawer
                type="overlay"
                content={<DrawerPanel />}
                tapToClose={true}
                open={true}
                openDrawerOffset={0.3} // 20% gap on the right side of drawer
                panCloseMask={0.2}
                closedDrawerOffset={-3}
                styles={drawerStyles}
                tweenHandler={(ratio) => ({
                    main: { opacity: (2 - ratio) / 2 }
                })}
            >
                <HomeScreen />
            </Drawer>


        );
    }

    closeControlPanel = () => {
        this.setState({
            isDrawerOpen: false
        });
    };
    openControlPanel = () => {
        this.setState({
            isDrawerOpen: true
        });
    };
}

const drawerStyles = {
    drawer: {
        flex: 1,
        shadowColor: '#cdcdcd', 
        shadowOpacity: 10, 
        shadowRadius: 3, 
        backgroundColor: "white"
    },
    main: { paddingLeft: 3 }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff'
    },
    textInputRow: {
        flexDirection: 'row',
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInputContainer: {
        borderColor: '#000',
        borderStyle: 'solid',
        borderWidth: 2,
        backgroundColor: '#fff',
        margin: 10,
    },
    buttonMarginTop: {
        marginTop: 550
    }
});
