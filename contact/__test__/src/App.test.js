/**
 * @jest-environment node
 */

import { cleanup, render, screen } from '@testing-library/react-native';
import App from '../../App';



jest.useFakeTimers();

jest.mock('../../src/actions', () => ({
    ...jest.requireActual('../../src/actions'),
    contactFetch: jest.fn().mockReturnValue({
        type: 'contact_fetch_success', payload: mockTransformedListData
    }),

 
}))
describe('App test', () => {
    afterEach(() => {
        cleanup();
        jest.clearAllMocks()
    })

    test('two contact list text should be displayed', async () => {
        render(<App />)

        const contactList = screen.getAllByText('Contact List')
        expect(contactList).toHaveLength(2)

    })

    test('emergency tab text should be displayed', () => {

        render(<App />)

        const emergencyTab = screen.getAllByText('Emergency List')
        expect(emergencyTab).toHaveLength(1)

    })

})

const mockTransformedListData = [
    {
        id: 'contact1',
        firstName: 'John',
        lastName: 'test',
        phone: [{ digit: '23232', type: 'phone' }],
        image: null,
        emergencyContact: false,
        notes: 'test note'
    },
    {
        id: 'contact2',
        firstName: 'Alice',
        lastName: 'test',
        phone: [{ digit: '23232', type: 'phone' }],
        image: null,
        emergencyContact: false,
        notes: 'test'
    }
]