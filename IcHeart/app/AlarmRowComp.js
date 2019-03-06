import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import ReactNativeAN from 'react-native-alarm-notification';

export default class AlarmRowComp extends Component {
    _deleteRow = (id) => {
        ReactNativeAN.cancelNotification(id)
        this.forceUpdate()
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.rowOne}>
                    <Image
                        source={require('./images/alarm.png')}
                        style={{ width: 25, height: 25 }}
                    />
                    <Text style={styles.time}>{this.props.time}</Text>
                    <TouchableOpacity
                        onPress={() => this._deleteRow(this.props.id)}
                        style={styles.delete}
                    >
                        <Image
                            source={require('./images/trash.png')}
                            style={{ width: 25, height: 25 }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.rowTwo}>
                    <Image
                        source={require('./images/edit.png')}
                        style={{ width: 25, height: 25 }}
                    />
                    <Text style={styles.medName}>{this.props.medName}</Text>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        padding: 15,
        width: '95%',
        backgroundColor: 'white',
        margin: 10
    },
    rowOne: {
        flexDirection: 'row',
        paddingBottom: 15

    },
    rowTwo: {
        flexDirection: 'row'

    },
    time: {
        fontSize: 20,
        fontWeight: '700',
        paddingLeft: 15,
        flex: 1
    },
    medName: {
        fontSize: 15,
        fontWeight: '400',
        paddingLeft: 15
    },
    delete: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
