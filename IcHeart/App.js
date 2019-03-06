/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Router, Scene, Stack } from 'react-native-router-flux';

import LoginScreen from './app/LoginScreen';
import SignUpScreen from './app/SignUpScreen';
import HomeScreen from './app/HomeScreen';
import AddMedicineScreen from './app/AddMedicineScreen';
import AddDoctorsScreen from './app/AddDoctorsScreen';
import AddAppointmentScreen from './app/AddAppointmentScreen';
import MainContainerScreen from './app/MainContainerScreen';
import UserSignUpScreen from './app/UserSignUpScreen';

import NavBar from './app/NavBar';
import DoctorsScreen from './app/DoctorScreen';
import AppointmentScreen from './app/AppointmentScreen';
import MedScreen from './app/MedScreen';
import LegalScreen from './app/LegalScreen';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Router>
        <Stack key="root">
          <Scene key="login" component={LoginScreen} title="Login" initial ></Scene>
          <Scene key="signup" component={SignUpScreen} title="Personal Details" ></Scene>
          <Scene key="home" component={MainContainerScreen} title="Home" navBar={NavBar} ></Scene>
          <Scene key="homeScreen" component={HomeScreen} title="Home" navBar={NavBar} ></Scene>
          <Scene key="addMedicine" component={AddMedicineScreen} title="Add Medicine" ></Scene>
          <Scene key="addDoctors" component={AddDoctorsScreen} title="Add Doctors" ></Scene>
          <Scene key="addAppointment" component={AddAppointmentScreen} title="Add Appointment" ></Scene>
          <Scene key="doctorScreen" component={DoctorsScreen} title="Doctors" ></Scene>
          <Scene key="appointmentScreen" component={AppointmentScreen} title="Appointments" ></Scene>
          <Scene key="medScreen" component={MedScreen} title="Medicine"  ></Scene>
          <Scene key="userSignUpScreen" component={UserSignUpScreen} title="User SignUp"  ></Scene>
          <Scene key="legalScreen" component={LegalScreen} title="Legal"  ></Scene>
        </Stack>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
