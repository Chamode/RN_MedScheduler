import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import { Actions } from 'react-native-router-flux';


export default class TitleRowComp extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={this.props.isDoctor ? require('./images/doctor.png') : require('./images/calendar.png')}
                    style={{ width: 50, height:50 }}
                    />
                <Text style={styles.title}>
                    {this.props.rowName}
                </Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginHorizontal: 50
    },
    title: {
        fontSize: 20,
        fontWeight: '700'
    }
});
