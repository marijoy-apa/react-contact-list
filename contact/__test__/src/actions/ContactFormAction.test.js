
import '@react-navigation/native'

import { cleanup } from '@testing-library/react-native';

import { clearContactForm, clearFormError, contactFormUpdate, createContact, deleteContact, updateContact, updateEmergencyContact } from '../../../src/actions';
import { getDatabase, push, ref, update, remove } from 'firebase/database';
import { contactItemForm } from '../../data/contactForm';
import mockReduxStore from '../../store/reduxStore';

jest.mock('firebase/database', () => ({
    getDatabase: jest.fn(),
    query: jest.fn(),
    ref: jest.fn(),
    orderByChild: jest.fn(),
    onValue: jest.fn(),
    update: jest.fn(),
    push: jest.fn(),
    remove: jest.fn(),
}));


describe('Create contact action', () => {
    afterEach(() => {
        cleanup();
        jest.clearAllMocks()
    })


    test('update form', async () => {
        const store = mockReduxStore() 

        store.dispatch(contactFormUpdate({ prop: 'firstName', value: 'John' }))

        const state = store.getState();
        expect(state.contactForm.firstName).toBe('John')
    })

    test('ref function should be called with correct db path', async () => {
        ref.mockResolvedValueOnce({})
        push.mockResolvedValueOnce({})
        getDatabase.mockReturnValue({})

        const store = mockReduxStore() 
        const referencePath = 'contact-list'
        const contactItem = contactItemForm;

        store.dispatch(createContact(contactItem))
        expect(ref).toHaveBeenCalledWith({}, referencePath);

    })

    test('push function should be called with correct contact form object property', async () => {
        push.mockResolvedValueOnce({})
        const store = mockReduxStore() 
        const contactItem = contactItemForm
        store.dispatch(createContact(contactItem))
        expect(push).toHaveBeenCalledWith(undefined, contactItem);
    })

    test('error update when there are error with push function', async () => {
        push.mockRejectedValue({})
        const store = mockReduxStore() 
        const contactItem = contactItemForm
        await store.dispatch(createContact(contactItem))
        state = store.getState()
        expect(state.contactForm.error).toBe('Unable to create new contact.');
    })
})


describe('Update Contact action', () => {
    afterEach(() => {
        cleanup();
        jest.clearAllMocks()
    })

    test('ref function should be called with correct db path with id', async () => {
        ref.mockResolvedValueOnce({})
        update.mockResolvedValueOnce({})
        getDatabase.mockReturnValue({})

        const store = mockReduxStore() 

        const contactItem = contactItemForm
        const referencePath = `contact-list/${contactItem.id}`

        store.dispatch(updateContact(contactItem))
        expect(ref).toHaveBeenCalledWith({}, referencePath);
    })

    test('update function should be called with correct contact form object property', async () => {
        update.mockResolvedValueOnce({})
        const store = mockReduxStore() 
        const contactItem = contactItemForm
        store.dispatch(updateContact(contactItem))
        expect(update).toHaveBeenCalledWith(undefined, contactItem);
    })

    test('error update when there are error with update function', async () => {
        update.mockRejectedValue({})
        const store = mockReduxStore() 
        const contactItem = contactItemForm
        await store.dispatch(updateContact(contactItem))
        state = store.getState()
        expect(state.contactForm.error).toBe('Unable to update contact.');
    })
})


describe('Update emergnecy Contact action', () => {
    afterEach(() => {
        cleanup();
        jest.clearAllMocks()
    })

    test('ref function should be called with correct db path with id', async () => {
        ref.mockResolvedValueOnce({})
        update.mockResolvedValueOnce({})
        getDatabase.mockReturnValue({})

        const store = mockReduxStore() 

        const id = '1'
        const emergencyContact = false
        const referencePath = `contact-list/${id}`

        store.dispatch(updateEmergencyContact(id, emergencyContact))
        expect(ref).toHaveBeenCalledWith({}, referencePath);
    })

    test('update emergency function should be called with emergency property', async () => {
        update.mockResolvedValueOnce({})
        const store = mockReduxStore() 
        const id = '1'
        const emergencyContact = false
        store.dispatch(updateEmergencyContact(id, emergencyContact))
        expect(update).toHaveBeenCalledWith(undefined, { emergencyContact });
    })

    test('error update when there are error with update emergency function', async () => {
        update.mockRejectedValue({})
        const store = mockReduxStore() 
        const id = '1'
        const emergencyContact = false
        await store.dispatch(updateEmergencyContact(id, emergencyContact))
        state = store.getState()
        expect(state.contactForm.error).toBe('Unable to update contact.');
    })

})

describe('Delete Contact action', () => {
    afterEach(() => {
        cleanup();
        jest.clearAllMocks()
    })

    test('ref function should be called with correct db path with id upon delete', async () => {
        ref.mockResolvedValueOnce({})
        remove.mockResolvedValueOnce({})
        getDatabase.mockReturnValue({})

        const store = mockReduxStore() 

        const id = '1'
        const referencePath = `contact-list/${id}`

        store.dispatch(deleteContact(id))
        expect(ref).toHaveBeenCalledWith({}, referencePath);
    })

    test('error update when there are error with update emergency function', async () => {
        remove.mockRejectedValue({})
        const store = mockReduxStore() 

        const id = '1'
        await store.dispatch(deleteContact(id))
        state = store.getState()
        expect(state.contactForm.error).toBe('Unable to delete contact.');

    })

})

describe('clear error action', () => {
    afterEach(() => {
        cleanup();
        jest.clearAllMocks()
    })

    test('should clear form when clearContact Form is called', async () => {
        const store = mockReduxStore() 
        store.dispatch(contactFormUpdate({ prop: 'firstName', value: 'John' }))

        var state = store.getState();
        expect(state.contactForm.firstName).toBe('John')

        store.dispatch(clearContactForm())
        state = store.getState();
        expect(state.contactForm.firstName).toBe('')
    })

    test('should clear form when clearContact Form is called', async () => {
        remove.mockRejectedValue({})
        const store = mockReduxStore() 
        const id = '1'
        await store.dispatch(deleteContact(id))
        var state = store.getState()
        expect(state.contactForm.error).toBe('Unable to delete contact.');

        store.dispatch(clearFormError())
        state = store.getState();
        expect(state.contactForm.error).toBe(null)
    })
})

describe('update error with timeout action', () => {
    afterEach(() => {
        cleanup();
        jest.clearAllMocks()
        jest.useRealTimers();
    })

    beforeEach(() => {
        jest.useFakeTimers();
    })



    test('should clear error after 4 seconds', async () => {
        update.mockRejectedValue({})
        const store = mockReduxStore() 
        const contactItem = contactItemForm
        await store.dispatch(updateContact(contactItem))
        var state = store.getState()
        expect(state.contactForm.error).toBe('Unable to update contact.');
        jest.advanceTimersByTime(4000);

        state = store.getState()
        expect(state.contactForm.error).toBe(null);
    })
})