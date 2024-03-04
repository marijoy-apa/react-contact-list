module.exports = {
    preset: 'jest-expo',
    testEnvironment: 'jest-environment-jsdom',
    setupFiles: ['./jest.setup.js'],
    "transformIgnorePatterns": [
        "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|react-redux|firebase|)"
    ]
};
