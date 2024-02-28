import { useColorScheme } from "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

import App from "../App";

const darkTheme = {
    color: '#1A1A1A'
    // ...DefaultTheme,
    // roundness: 2,
    // colors: {
    //     ...DefaultTheme.colors,
    //     primary: "#1A1A1A",
    //     accent: "#FAFAFA"
    // },
};

const lightTheme = {
    backgroundColor: '#FAFAFA',
    color: '#FAFAFA'
    // ...DefaultTheme,
    // roundness: 2,
    // colors: {
    //     ...DefaultTheme.colors,
    //     primary: "#FAFAFA",
    //     accent: "#1A1A1A",
    // },
};

export default function Main() {
    const scheme = useColorScheme();
    return (
        <PaperProvider theme={scheme === 'dark' ? darkTheme : lightTheme}>
            <App />
        </PaperProvider>
    );
}