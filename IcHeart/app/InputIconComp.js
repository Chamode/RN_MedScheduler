import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View,
    TextInput,
    Prop
} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class InputIconComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFocus: false,
        };
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.textInputRow}>
                    <View style={styles.textContainer}>
                        <Image
                            source={this.props.isCalendar ? require('./images/calendarIcon.png') : require('./images/clock.png')}
                            style={{ width: 50, height: 50 }}
                        />
                    </View>
                    <View style={styles.textInputContainerContainer}>
                        <TextInput style={[styles.textInputContainer, styles.textInputContainerBlur, (this.state.isFocus ? styles.textInputContainerFocus : null)]}
                            allowFontScaling
                            secureTextEntry={this.props.secureTextInput}
                            onFocus={() => this.onTextInputFocus()}
                            onBlur={() => this.onTextInputBlur()}
                            returnKeyType={this.props.returnKey}
                            editable={false}
                            value={this.props.valueDateTime}
                            onChangeText={this.props.onChangeText}
                        >

                        </TextInput>
                    </View>
                </View>
            </View>
        );
    }

    onTextInputFocus() {
        this.setState({
            isFocus: true
        });
    };

    onTextInputBlur() {
        this.setState({
            isFocus: false
        });
    }
}

const gray = "#666";
const blue = "#161595";

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        alignSelf: "stretch",
        marginTop: 20
    },
    text: {
        // flex: 1,
        color: blue
    },
    textContainer: {
        flex: 1,
        alignItems: "center"
    },
    textInputRow: {
        // flex: 1,
        flexDirection: "row",
    },
    textInputContainerContainer: {
        flex: 1,
        alignItems: "flex-start"
    },
    textInputContainer: {
        width: 150,
        borderBottomWidth: 1,
        padding: 0,
        paddingLeft: 3,
        paddingRight: 3,
        marginBottom: 10,
        color: gray,
        // height:22.5
    },
    textInputContainerBlur: {
        borderColor: gray,
    },
    textInputContainerFocus: {
        borderColor: blue,
    }
});
