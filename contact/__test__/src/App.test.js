/**
 * @jest-environment node
 */

import { cleanup, fireEvent, render, screen } from '@testing-library/react-native';
import App from '../../App';
import { onValue } from 'firebase/database';
import { onValueList } from '../data/contactList';
jest.useFakeTimers();

jest.mock('firebase/database', () => ({
    ...jest.requireActual('firebase/database'),
    onValue: jest.fn(),

}));
describe('App test', () => {
    afterEach(() => {
        cleanup();
        jest.clearAllMocks()
    })
    test('two contact list text should be displayed', () => {
        const mockSnapshot = {
            val: jest.fn(() => (onValueList)),
        };
        onValue.mockImplementationOnce((_, callback) => {
            callback(mockSnapshot)
        })
        render(<App />)

        const contactList = screen.getAllByText('Contact List')
        expect(contactList).toHaveLength(2)

    })

    test('emergency tab text should be displayed', () => {
        const mockSnapshot = {
            val: jest.fn(() => (onValueList)),
        };
        onValue.mockImplementationOnce((_, callback) => {
            callback(mockSnapshot)
        })
        render(<App />)

        const emergencyTab = screen.getAllByText('Emergency List')
        expect(emergencyTab).toHaveLength(1)

    })

    test('on click of Emergency list tab should navigate to Emergency List page', () => {
        const mockSnapshot = {
            val: jest.fn(() => (onValueList)),
        };
        onValue.mockImplementationOnce((_, callback) => {
            callback(mockSnapshot)
        })
        render(<App />)

        const emergencyListTab = screen.getByText('Emergency List');
        var emergencyListText = screen.getAllByText('Emergency List')
        expect(emergencyListText).toHaveLength(1)

        fireEvent.press(emergencyListTab);
        emergencyListText = screen.getAllByText('Emergency List')
        expect(emergencyListText).toHaveLength(2)
    })

    // test('changes theme when appearance changes', () => {
    //     const mockSnapshot = {
    //         val: jest.fn(() => (onValueList)),
    //     };
    //     onValue.mockImplementationOnce((_, callback) => {
    //         callback(mockSnapshot)
    //     })
    //     render(<App />)
 
    //     // const emergencyListTab = screen.getByAccessibilityState('MainStackNavigator');
    //     var emergencyListText = screen.getAllByText('Emergency List')
    //     expect(emergencyListText).toHaveLength(1) 
 
    //     fireEvent.press(emergencyListTab);
    //     emergencyListText = screen.getAllByText('Emergency List')
    //     expect(emergencyListText).toHaveLength(2)
    // })


})