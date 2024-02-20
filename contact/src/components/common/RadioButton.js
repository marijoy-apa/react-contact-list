import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'
import Spacer from './Spacer';
import RadioElement from './RadioElement';
const RadioButton = ({ onSelectPhoneType, preselectedOption }) => {
    const [selectedOption, setSelectedOption] = useState(preselectedOption);

    const handleOptionPress = (option) => {
        console.log('handle option press', option)
        setSelectedOption(option);
        onSelectPhoneType(option);
    };
    return (
        <View>
            <RadioElement
                value="Mobile"
                onSelect={handleOptionPress}
                selectedOption={selectedOption} />
            <RadioElement
                value="Phone"
                onSelect={handleOptionPress}
                selectedOption={selectedOption} />
            <RadioElement
                value="Work"
                onSelect={handleOptionPress}
                selectedOption={selectedOption} />
            <RadioElement
                value="Main"
                onSelect={handleOptionPress}
                selectedOption={selectedOption} />
            <RadioElement
                value="Fax"
                onSelect={handleOptionPress}
                selectedOption={selectedOption} />
            <RadioElement
                value="Pager"
                onSelect={handleOptionPress}
                selectedOption={selectedOption} />
            <RadioElement
                value="Custom"
                onSelect={handleOptionPress}
                selectedOption={selectedOption} />
        </View>
    );
};

const styles = StyleSheet.create({
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    text: {

    },
    icon: {

    }

});

export default RadioButton;
