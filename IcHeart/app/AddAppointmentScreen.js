import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Button,
    Picker
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import DateTimePicker from 'react-native-modal-datetime-picker';

import InputIconComp from './InputIconComp'
import InputContainerComp from './InputContainerComp'
import TitleRowComp from './TitleRowComp'

const gray = "#666";
const blue = "#161595";

export default class AddAppointmentScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            appTitle: '',
            location: '',
            notes: '',
            isDateTimePickerVisible: false,
            isTimePickerVisible: false,
            dateObject: null,
            timeObject: null,
            selected: '',
            doctorsName: []
        }

        fetch('http://13.250.11.222/Project/doctors/', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                var doctors = [];
                responseJson.forEach(element => {
                    doctors.push(element.name);
                });
                this.setState({
                    doctorsName: doctors
                })
            })
            .catch((error) => {
                console.error(error);
            });

        // this is where we do the binding
        this._onChangeAppTitle = this._onChangeAppTitle.bind(this)
        this._onChangeLocation = this._onChangeLocation.bind(this)
        this._onChangeNotes = this._onChangeNotes.bind(this)
    }

    _onChangeAppTitle = (appTitle) => {
        this.setState({ appTitle: appTitle }); // good practice for immutability
    }

    _onChangeLocation(location) {
        this.setState({ location: location }); // good practice for immutability
    }
    _onChangeNotes(notes) {
        this.setState({ notes: notes }); // good practice for immutability
    }
    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        this.setState({ dateObject: date.getFullYear() + "-" + parseInt(date.getMonth() + 1) + "-"+ date.getDate() });
        this._hideDateTimePicker();
    };

    // Time
    _showTimePicker = () => {
        this.setState({ isTimePickerVisible: true });
    }

    _hideTimePicker = () => this.setState({ isTimePickerVisible: false });

    _handleTimePicked = (time) => {
        this.setState({ timeObject: time.getHours() + ":" + parseInt(time.getMinutes()) });

        this._hideTimePicker();
    };

    _updateSelected = (selected) => {
        this.setState({ selected: selected })
    }

    //Saves user input and saves to database
    _saveFuction = () => {
        fetch('http://13.250.11.222/Project/appointments/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: this.state.appTitle,
                date: this.state.dateObject,
                time: this.state.timeObject,
                notes: this.state.notes,
                location: this.state.location,
                doctor: this.state.selected
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    filteredList: responseJson
                })
                Actions.pop()
            })
            .catch((error) => {
                console.error(error);
            });
    }

    //Creates UI and add event listeners
    render() {
        var options = this.state.doctorsName;
        return (
            <View style={styles.containerMain}>
                <View style={styles.containerTop}>
                    <TitleRowComp
                        rowName="Appointment"
                    />
                </View>
                <View style={styles.containerBottom}>
                    <ScrollView>
                        <InputContainerComp
                            rowName="Appointment Title:"
                            onChangeText={this._onChangeAppTitle}
                            textValue={this.state.appTitle}
                        />
                        <View style={styles.textInputRow}>
                            <Text style={{ color: blue }}>Doctors: </Text>
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
                        </View>
                        <TouchableOpacity
                            style={styles.dateTimeRow}
                            onPress={this._showDateTimePicker}>
                            <InputIconComp
                                isCalendar
                                valueDateTime={this.state.dateObject}
                            />
                        </TouchableOpacity>
                        <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this._handleDatePicked}
                            onCancel={this._hideDateTimePicker}
                        />
                        <TouchableOpacity
                            style={styles.dateTimeRow}
                            onPress={this._showTimePicker}>
                            <InputIconComp
                                valueDateTime={this.state.timeObject} />
                        </TouchableOpacity>
                        <DateTimePicker
                            mode='time'
                            is24Hour={false}
                            isVisible={this.state.isTimePickerVisible}
                            onConfirm={this._handleTimePicked}
                            onCancel={this._hideTimePicker}
                        />
                        <InputContainerComp
                            rowName="Location:"
                            onChangeText={this._onChangeLocation}
                            textValue={this.state.location}
                        />
                        <InputContainerComp
                            rowName="Notes:"
                            onChangeText={this._onChangeNotes}
                            textValue={this.state.notes}
                        />
                    </ScrollView>
                    <View style={styles.saveButton}>
                        <Button
                            onPress={this._saveFuction}
                            title="Save"
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
        flex: 0.15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerBottom: {
        flex: 1,
    },
    saveButton: {
        width: '100%',
        flex: 1,
        justifyContent: 'flex-end',
    },
    DropdownMenu: {
        // flex: 1,
        width: 150,
        paddingLeft: 30,
        borderColor: gray,
    },
    textInputRow: {
        flexDirection: 'row',
        marginHorizontal: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },

    dateTimeRow: {
        flex: 1,
    }
});
