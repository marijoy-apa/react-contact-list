import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import NumberInput from "./NumberInput";

const AddButton = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>

            <View style={styles.container}>
                <MaterialIcons name="add-circle" style={styles.addCircle}/>
                <Text>Add phone</Text>
            </View>
        </TouchableOpacity>



    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    }, 
    button:{
        alignSelf: 'flex-start',
        paddingLeft: 20,
    }, 
    addCircle:{
        marginRight: 12,
        fontSize: 23,
        color: 'green'
    }
})



export default AddButton