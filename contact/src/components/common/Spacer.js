import React from "react";
import { View} from 'react-native'

// Spacer component adds empty space with optional styling
const Spacer = ({ style }) => {
    return (
        <View style={[style]}>
        </View>

    )
}

export default Spacer