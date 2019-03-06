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

export default class DocRowComp extends Component {
    _deleteRow = (url) => {
        // Delete code here
        fetch(url, {
            method: 'DELETE'
        })

        this.forceUpdate()


    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.rowOne}>
                    <Image
                        source={require('./images/doctor.png')}
                        style={{ width: 25, height: 25 }}
                    />
                    <Text style={styles.time}> Name: {this.props.name}</Text>
                    <Text style={styles.time}> {this.props.specialty}</Text>
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
                <View style={styles.rowTwo}>
                    <Text style={styles.medName}>Tel: {this.props.mNo}</Text>
                    <Text>{"        "}</Text>
                    <Text style={styles.medName}>Office: {this.props.fNo}</Text>
                </View>
                <View style={styles.rowTwo}>

                </View>
                <View style={styles.rowTwo}>
                    <Text style={styles.medName}>Email: {this.props.email}</Text>
                </View>
                <View style={styles.rowTwo}>
                    <Text style={styles.medName}>Address: {this.props.address}</Text>
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
