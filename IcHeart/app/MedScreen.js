import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    FlatList
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ReactNativeAN from 'react-native-alarm-notification';
import PTRView from 'react-native-pull-to-refresh';

import MedRowComp from './MedRowComp'

export default class AppointmentScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {

            filteredList: null,
        };
    }
    _refresh = () => {
        return new Promise((resolve) => {
            this.setState({ filteredList: null})
            setTimeout(() => { resolve() }, 2000)
        });
    }

    _getMeds = () => {
        fetch('http://13.250.11.222/Project/medicines/', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    filteredList: responseJson,
                    responseLength: responseJson.length
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }
    _generateDoctorList = (alarmNotif) => {

        // filteredAlarm = alarmNotif.filter(alarms => alarms.fire_date > ReactNativeAN.parseDate(new Date(Date.now())))
        // this.setState({
        //     filteredList: filteredAlarm
        // })
    }
    render() {


        return (

            <View style={styles.containerMain}>
                <PTRView onRefresh={this._refresh} >
                    <View style={styles.containerTop}>
                        {this.state.filteredList == null  ? this._getMeds() : null}
                        {
                            this.state.filteredList ?
                                <FlatList
                                    data={this.state.filteredList}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item }) => {
                                        return (
                                            <MedRowComp
                                                medicine={item.name}
                                                desc={item.desc}
                                                dosage={item.dosage}
                                                units={item.unit}
                                                url={item.url}
                                            />)
                                    }
                                    }
                                    keyExtractor={item => item.id.toString()}
                                /> : null


                        }
                    </View>
                </PTRView>
                <View style={styles.containerBottom}>
                    <View style={styles.loginButton}>
                        <Button
                            onPress={Actions.addMedicine}
                            title="ADD MEDICINE"
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
        flex: 1
    },
    containerBottom: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginButton: {
        width: '100%',
        flex: 1,
        justifyContent: 'flex-end',
    }
});
