import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Modal,
    Button,
    FlatList,
    Picker
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ReactNativeAN from 'react-native-alarm-notification';
import PTRView from 'react-native-pull-to-refresh';
import AlarmRowComp from './AlarmRowComp'

let fireDate = null;      // set the fire date for 1 second from now
// const fireDate = '01-01-1976 00:00:00';			  // set exact date time | Format: dd-MM-yyyy HH:mm:ss
let idCount = 0;

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            enableClock: false,
            isDateTimePickerVisible: false,
            isTimePickerVisible: false,
            timeObject: null,
            filteredList: null,
            afterTime: false,
            selected: null,
            medNames: [],
            modalVisible: false,
            medSelected: false
        };
        fetch('http://13.250.11.222/Project/medicines/', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                var med = [];
                responseJson.forEach(element => {
                    med.push(element.name);
                });
                this.setState({
                    medNames: med
                })
                console.log(this.state.medNames)
            })

            .catch((error) => {
                console.error(error);
            });
    }
    _refresh = () => {
        return new Promise((resolve) => {
            this.setState({ filteredList: null })
            setTimeout(() => { resolve() }, 2000)
        });
    }
    _updateSelected = (selected) => {
        this.setState({ selected: selected })
    }
    // Time
    _showTimePicker = () => {
        this.setState({ isTimePickerVisible: true });
    }

    _hideTimePicker = () => {
        this.setState({
            isTimePickerVisible: false,
        });
    }

    _handleTimePicked = (time) => {
        this.setState({ timeObject: time, modalVisible: true });
    };

    _handleTime = (time, med) => {
        fireDate = ReactNativeAN.parseDate(time);
        idCount++;
        const alarmNotifData = {
            id: idCount.toString(),                                  // Required
            title: "Time to take your medicine",               // Required
            message: med,                                 // Required
            channel: "my_channel_id",                     // Required. Same id as specified in MainApplication's onCreate method
            ticker: "My Notification Ticker",
            auto_cancel: true,                            // default: true
            vibrate: true,
            vibration: 100,                               // default: 100, no vibration if vibrate: false
            small_icon: "ic_launcher",                    // Required
            large_icon: "ic_launcher",
            play_sound: true,
            sound_name: null,                             // Plays custom notification ringtone if sound_name: null
            color: "red",
            schedule_once: true,                          // Works with ReactNativeAN.scheduleAlarm so alarm fires once
            tag: 'some_tag',
            fire_date: fireDate,                          // Date for firing alarm, Required for ReactNativeAN.scheduleAlarm.

        };
        this._hideTimePicker();
        ReactNativeAN.scheduleAlarm(alarmNotifData);
    }

    _getAlarms = () => {
        // ReactNativeAN.cancelAllNotifications()
        ReactNativeAN.getScheduledAlarms().then(
            alarmNotif => this._generateAlarmsList(alarmNotif))
    }
    _generateAlarmsList = (alarmNotif) => {
        //Get All Scheduled Alarms
        ReactNativeAN.getScheduledAlarms().then(alarmNotif => console.log(alarmNotif));
        var largest = 0;
        alarmNotif.forEach(function (elem) {
            if (largest < elem.id)
                largest = elem.id;
        });
        idCount = largest;
        filteredAlarm = alarmNotif.filter(alarms => alarms.fire_date > ReactNativeAN.parseDate(new Date(Date.now())))
        this.setState({
            filteredList: filteredAlarm
        })
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    _closeModal = () => {
        if (this.state.selected !== null && this.state.selected !== '') {
            this.setModalVisible(!this.state.modalVisible)
            this._handleTime(this.state.timeObject, this.state.selected)
        }
    }
    render() {
        var options = this.state.medNames;
        return (
            <View style={styles.containerMain}>
                <PTRView onRefresh={this._refresh} >
                    <View style={styles.containerTop}>
                        {this.state.filteredList ? null : this._getAlarms()}
                        {
                            <FlatList
                                data={this.state.filteredList}
                                showsVerticalScrollIndicator={false}

                                renderItem={({ item }) => {
                                    var timeProp = item.fire_date.split(" ");
                                    timeProp = timeProp[1];
                                    return (
                                        <AlarmRowComp
                                            time={timeProp}
                                            medName={item.message}
                                            id={item.id}
                                        />)
                                }
                                }
                                keyExtractor={item => item.id.toString()}
                            />


                        }
                    </View>
                </PTRView>
                <View style={styles.containerBottom}>
                    <View style={styles.loginButton}>
                        <Button
                            onPress={this._showTimePicker}
                            title="ADD ALARM"
                        />
                        <DateTimePicker
                            mode='time'
                            is24Hour={false}
                            isVisible={this.state.isTimePickerVisible}
                            onConfirm={this._handleTimePicked}
                            onCancel={this._hideTimePicker}
                        />
                        <Modal
                            animationType="slide"
                            transparent={false}
                            style={styles.modal}
                            visible={this.state.modalVisible}
                            onRequestClose={() => {
                                Alert.alert('Modal has been closed.');
                            }}>
                            <View style={styles.containerMainModal}>
                                <View style={styles.containerSmallModal}>
                                <Text>{'Pick a medicine from the dropdown'}</Text>
                                    <Picker
                                        style={styles.DropdownMenu}
                                        mode="dropdown"
                                        selectedValue={this.state.selected}
                                        onValueChange={this._updateSelected}>
                                        <Picker.Item label='' value='' />
                                        {options.map((item, index) => {
                                            return (<Picker.Item label={item} value={item} key={index} />)
                                        })}
                                    </Picker>
                                    <Button
                                        title={'Confirm Medicine'}
                                        onPress={() => {
                                            this._closeModal()
                                        }}></Button>
                                </View></View>
                        </Modal>
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
    },
    containerMainModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerSmallModal: {
        flex: 0.8,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
});
