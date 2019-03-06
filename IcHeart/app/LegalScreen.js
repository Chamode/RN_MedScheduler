import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Modal,
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
            privacyVisible: false,
            disclaimerVisible: false
        };
    }

    _refresh = () => {
        return new Promise((resolve) => {
            this.setState({ filteredList: null })
            setTimeout(() => { resolve() }, 2000)
        });
    }
    _openPrivacyModal(visible) {
        this.setState({ privacyVisible: visible });
    }
    _closePrivacyModal = () => {
        this._openPrivacyModal(!this.state.privacyVisible)
    }
    _openDisclaimerModal(visible) {
        this.setState({ disclaimerVisible: visible });
    }
    _closeDisclaimerModal = () => {
        this._openDisclaimerModal(!this.state.disclaimerVisible)
    }
    render() {
        return (
            <View style={styles.containerMain}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    style={styles.modal}
                    visible={this.state.privacyVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={styles.containerMainModal}>
                        <View style={styles.containerSmallModal}>
                            <Text>This app works standalone and does not send or share any of your personal data.
The saved medications are stored virtually on the database server and it is secured at the backend. You can remove the information by deleting your account.
Your information are protected in your own IcHeart account. Hence your information are secured. The chances of data lost is prevented by having this account. You need to login in order to use this application.
Your password details will be hashed when its being saved in the database server.
The internet connection is used to load the details that has been saved by the users from the database server.
</Text>
                        </View>
                        <Button
                            title={'Close'}
                            onPress={() => {
                                this._closePrivacyModal()
                            }}></Button>
                    </View>
                </Modal>

                <Modal
                    animationType="slide"
                    transparent={false}
                    style={styles.modal}
                    visible={this.state.disclaimerVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={styles.containerMainModal}>
                        <View style={styles.containerSmallModal}>
                            <Text>This application is provided just as a mean of help attempt with no warranty or guarantee.
The application is not intended as a substitute for user’s self-care, attention or caregiver care. The user should regularly
consult a physician in matters relating to his/her health and particularly with respect to any symptoms that may require diagnosis or medical attention.
Although we made a great effort to ensure that the application comes in the best we can, the developer, do not assumer and hereby disclaim any liability
to any party for any harm, loss, damage, disruption or whatsoever caused by any malfunctions, errors, misusage, or any other causes related to the application.
</Text></View>

                            <Button
                                title={'Close'}
                                onPress={() => {
                                    this._closeDisclaimerModal()
                                }}></Button>
                        </View>
                </Modal>
                <View style={styles.containerBottom}>
                    <View style={styles.loginButton}>
                        <Button
                            onPress={() => { this._openPrivacyModal(true) }}
                            title="Read Privacy Policy"
                        />
                    </View>
                    <View style={styles.loginButton}>
                        <Button
                            onPress={() => { this._openDisclaimerModal(true) }}
                            title="Read Disclaimer"
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
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginButton: {
        width: '80%',
        flex: 0.8,
        justifyContent: 'flex-end',
    },
    containerMainModal: {
        flex: 1,
        margin: 20
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    containerSmallModal: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
