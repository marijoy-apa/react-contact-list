import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import RadioElement from './RadioElement';
const RadioButton = ({ onSelectPhoneType, preselectedOption, options }) => {
    const [selectedOption, setSelectedOption] = useState(preselectedOption);

    const handleOptionPress = (option) => {
        setSelectedOption(option);
        onSelectPhoneType(option);
    };


    return (
        <View style={styles.radioStyle}>
            {options.map((option) => (
                <RadioElement
                    key={option}
                    value={option}
                    onSelect={handleOptionPress}
                    selectedOption={selectedOption}
                />
            ))}
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

    },


});

export default RadioButton;
