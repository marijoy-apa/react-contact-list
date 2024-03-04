module.exports = {
    preset: 'jest-expo',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: [
        '<rootDir>/jest.env.js',
    ],
    setupFiles: ['./jest.setup.js'],
    "transformIgnorePatterns": [
        "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|react-redux|firebase|)"
    ]
};
