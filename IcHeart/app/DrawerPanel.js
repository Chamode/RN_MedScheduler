import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class DrawerPanel extends Component {
    render() {
        return (
            <View style={styles.containerMain}>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.touchable} onPress={Actions.homeScreen}>
                        <Image
                            source={require('./images/home.png')}
                            style={{ width: 50, height: 50 }}
                        />
                        <Text style={styles.title}> Home </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.touchable} onPress={Actions.medScreen}>
                        <Image
                            source={require('./images/medicine.png')}
                            style={{ width: 50, height: 50 }}
                        />
                        <Text style={styles.title}> Pharmacy </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.touchable} onPress={Actions.appointmentScreen}>
                        <Image
                            source={require('./images/calendar.png')}
                            style={{ width: 50, height: 50 }}
                        />
                        <Text style={styles.title}> Appointments </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.touchable} onPress={Actions.doctorScreen}>
                        <Image
                            source={require('./images/doctor.png')}
                            style={{ width: 50, height: 50 }}
                        />
                        <Text style={styles.title}> Doctors </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.touchable} onPress={Actions.legalScreen}>
                        <Image
                            source={require('./images/checklist.png')}
                            style={{ width: 50, height: 50 }}
                        />
                        <Text style={styles.title}> Legal </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    containerMain: {
        flex: 1
    },
    container: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 50
    },
    touchable: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 15,
        fontWeight: '500',
        marginLeft: 10
    }
});
