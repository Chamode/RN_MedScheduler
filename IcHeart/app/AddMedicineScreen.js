import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Button,
    Image
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import InputContainerComp from './InputContainerComp'

const options = {
    title: 'Select Input',
    storageOptions: {
        skipBackup: true,
        path: './images',
    },
};


export default class AddMedicineScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarSource: null,
            medicine: '',
            desc: '',
            dosage: '',
            units: '',
        };

        // this is where we do the binding
        this._onChangeMedicine = this._onChangeMedicine.bind(this)
        this._onChangeDesc = this._onChangeDesc.bind(this)
        this._onChangeDosage = this._onChangeDosage.bind(this)
        this._onChangeUnits = this._onChangeUnits.bind(this)
    }

    _onChangeMedicine = (medicine) => {
        this.setState({ medicine: medicine }); // good practice for immutability
    }

    _onChangeDesc(desc) {
        this.setState({ desc: desc }); // good practice for immutability
    }
    _onChangeDosage(dosage) {
        this.setState({ dosage: dosage }); // good practice for immutability
    }
    _onChangeUnits = (units) => {
        this.setState({ units: units }); // good practice for immutability
    }

    _useCamera = () => {
        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source,
                });
            }
        });
    }
    _saveFuction = () => {
        fetch('http://13.250.11.222/Project/medicines/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: this.state.medicine,
                desc: this.state.desc,
                dosage: this.state.dosage,
                unit: this.state.units
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    filteredList: responseJson
                })
                
                Actions.pop();
            })
            .catch((error) => {
                console.error(error);
            });
    }
    render() {
        return (
            <View style={{ flex: 1 }} >
                <ScrollView style={{ flex: 1 }} >
                    <View style={styles.container}>

                        <InputContainerComp
                            rowName="Medicine:"
                            onChangeText={this._onChangeMedicine}
                            textValue={this.state.medicine}
                        />
                        <InputContainerComp
                            rowName="Description:"
                            onChangeText={this._onChangeDesc}
                            textValue={this.state.desc}
                        />
                        <InputContainerComp
                            rowName="Dosage:"
                            onChangeText={this._onChangeDosage}
                            textValue={this.state.dosage}
                        />
                        <InputContainerComp
                            rowName="Dosage(Unit):"
                            onChangeText={this._onChangeUnits}
                            textValue={this.state.units}
                        />

                    </View>
                    <View style={styles.containerTwo}>
                        
                        </View>
                </ScrollView>

                <View style={styles.saveButton}>
                    <Button
                        onPress={this._saveFuction}
                        title="Save"

                    />
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerTwo: {
        flex: 0.6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageButton: {

    },
    saveButton: {
        width: '100%',
        justifyContent: 'flex-end',
    }
});
