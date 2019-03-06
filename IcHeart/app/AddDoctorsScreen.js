import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Button
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import InputContainerComp from './InputContainerComp'
import TitleRowComp from './TitleRowComp'

export default class AddDoctorScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dName: '',
            speciality: '',
            mobile: '',
            office: '',
            email: '',
            address: ''
        }

        // this is where we do the binding
        this._onChangeDName = this._onChangeDName.bind(this)
        this._onChangeSpeciality = this._onChangeSpeciality.bind(this)
        this._onChangeMobile = this._onChangeMobile.bind(this)
        this._onChangeOffice = this._onChangeOffice.bind(this)
        this._onChangeEmail = this._onChangeEmail.bind(this)
        this._onChangeAddress = this._onChangeAddress.bind(this)
    }

    _onChangeDName = (dName) => {
        this.setState({ dName: dName }); // good practice for immutability
    }

    _onChangeSpeciality(speciality) {
        this.setState({ speciality: speciality }); // good practice for immutability
    }
    _onChangeMobile(mobile) {
        this.setState({ mobile: mobile }); // good practice for immutability
    }
    _onChangeOffice = (office) => {
        this.setState({ office: office }); // good practice for immutability
    }

    _onChangeEmail(email) {
        this.setState({ email: email }); // good practice for immutability
    }
    _onChangeAddress(address) {
        this.setState({ address: address }); // good practice for immutability
    }

    //Saves user input and saves to database
    _saveFuction = () => {
        fetch('http://13.250.11.222/Project/doctors/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
                name: this.state.dName,
                speciality: this.state.speciality,
                mNumber: this.state.mobile,
                oNumber: this.state.office,
                email: this.state.email,
                address: this.state.address
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
        return (
            <View style={styles.containerMain}>
                <View style={styles.containerTop}>
                    <TitleRowComp
                        isDoctor
                        rowName="Doctor's Profile"
                    />
                </View>
                <View style={styles.containerBottom}>
                    <ScrollView>
                        <InputContainerComp
                            rowName="Doctor's Name:"
                            onChangeText={this._onChangeDName}
                            textValue={this.state.dName}
                        />
                        <InputContainerComp
                            rowName="Speciality:"
                            onChangeText={this._onChangeSpeciality}
                            textValue={this.state.speciality}
                        />
                        <InputContainerComp
                            rowName="Mobile Number:"
                            onChangeText={this._onChangeMobile}
                            textValue={this.state.mobile}
                        />
                        <InputContainerComp
                            rowName="Office Number:"
                            onChangeText={this._onChangeOffice}
                            textValue={this.state.office}
                        />
                        <InputContainerComp
                            rowName="Email:"
                            onChangeText={this._onChangeEmail}
                            textValue={this.state.email}
                        />
                        <InputContainerComp
                            rowName="Address:"
                            onChangeText={this._onChangeAddress}
                            textValue={this.state.address}
                        />
                    </ScrollView>
                    <View style={styles.saveButton}>
                        <Button
                            onPress={ this._saveFuction }
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
    }
});
