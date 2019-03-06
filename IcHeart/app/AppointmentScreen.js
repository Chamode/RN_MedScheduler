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
import AppRowComp from './AppRowComp'

export default class AppointmentScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {

            filteredList: null,
        };
    }

    _refresh = () => {
        return new Promise((resolve) => {
            this.setState({ filteredList: null })
            setTimeout(() => { resolve() }, 2000)
        });
    }
    _getAppointments = () => {
        fetch('http://13.250.11.222/Project/appointments/', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    filteredList: responseJson
                })
            })
            .catch((error) => {
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
                        {this.state.filteredList == null ? this._getAppointments() : null}
                        {
                            this.state.filteredList ?
                                <FlatList
                                    data={this.state.filteredList}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item }) => {
                                        return (
                                            <AppRowComp
                                                title={item.title}
                                                doctor={item.doctor}
                                                date={item.date}
                                                time={item.time}
                                                location={item.location}
                                                notes={item.notes}
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
                            onPress={Actions.addAppointment}
                            title="ADD APPOINTMENT"
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
