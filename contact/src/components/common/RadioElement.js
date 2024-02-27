import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'
import Spacer from './Spacer';
const RadioElement = ({ value, onSelect, selectedOption }) => {

    const handleOptionPress = (option) => {
        onSelect(option)
    };

    const renderRadioIcon = (option) => {
        console.log(option, selectedOption)
        return (
            <FontAwesome
                name={selectedOption === option ? 'dot-circle-o' : 'circle-o'}
                size={20}
                style={styles.icon}
            />
        );
    };

    return (
        <TouchableOpacity
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
