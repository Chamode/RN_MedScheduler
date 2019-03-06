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

export default class AppRowComp extends Component {
    _deleteRow = (url) => {
        fetch(url, {
            method: 'DELETE'
        })
        // Delete code here
        this.forceUpdate()
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.rowOne}>
                    <Image
                        source={require('./images/calendar.png')}
                        style={{ width: 25, height: 25 }}
                    />
                    <Text style={styles.time}> Title: {this.props.title}</Text>

                    <TouchableOpacity
                        onPress={() => this._deleteRow(this.props.url)}
                        style={styles.delete}
                    >
                        <Image
                            source={require('./images/trash.png')}
                            style={{ width: 25, height: 25 }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.rowOne}>
                    <Text style={styles.time}> Doctor: {this.props.doctor}</Text>
                </View>
                <View style={styles.rowTwo}>
                    <Text style={styles.medName}>Date: {this.props.date}</Text>
                    <Text>{"        "}</Text>
                    <Text style={styles.medName}>Time: {this.props.time}</Text>
                </View>
                <View style={styles.rowTwo}>
                    <Text style={styles.medName}>Location: {this.props.location}</Text>
                </View>
                <View style={styles.rowTwo}>
                    <Text style={styles.medName}>Notes: {this.props.notes}</Text>
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
        paddingBottom: 5

    },
    rowTwo: {
        flexDirection: 'row'

    },
    time: {
        fontSize: 15,
        fontWeight: '500',
        paddingLeft: 15,
        flex: 1
    },
    medName: {
        fontSize: 15,
        fontWeight: '400',
        paddingLeft: 0
    },
    delete: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
