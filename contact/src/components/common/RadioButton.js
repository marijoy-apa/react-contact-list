import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import RadioElement from './RadioElement';

// RadioButton component that displays a list of radio options
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
});

export default RadioButton;
