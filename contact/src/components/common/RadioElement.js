import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'
import Spacer from './Spacer';

// RadioElement component representing a single radio option
const RadioElement = ({ value, onSelect, selectedOption }) => {

    // handler function to notify parent component of the selected option
    const handleOptionPress = (option) => {
        onSelect(option)
    };

    // Function to render the radio icon based on the selected state
    const renderRadioIcon = (option) => {
        return (
            <FontAwesome
                name={selectedOption === option ? 'dot-circle-o' : 'circle-o'}
                size={20}
                style={styles.icon}
            />
        );
    };

    return (
        <TouchableOpacity testID={`radio-element-${value}`}
            style={styles.optionContainer}
            onPress={() => handleOptionPress(value)}>
            {renderRadioIcon(value)}
            <Spacer style={{ width: 20 }} />
            <Text style={styles.text}>{value}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    text: {
        color: 'grey'
    },
    icon: {
        color: 'grey'

    }
});

export default RadioElement;
