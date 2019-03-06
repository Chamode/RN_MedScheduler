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
import DocRowComp from './DocRowComp'

export default class DoctorScreen extends Component {
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
    _getDoctors = () => {
        fetch('http://13.250.11.222/Project/doctors/', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    filteredList: responseJson
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
                        {this.state.filteredList == null ? this._getDoctors() : null}
                        {
                            this.state.filteredList ?
                                <FlatList
                                    data={this.state.filteredList}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item }) => {
                                        return (
                                            <DocRowComp
                                                name={item.name}
                                                specialty={item.speciality}
                                                mNo={item.mNumber}
                                                fNo={item.oNumber}
                                                email={item.email}
                                                address={item.address}
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
                            onPress={Actions.addDoctors}
                            title="ADD DOCTORS"
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
