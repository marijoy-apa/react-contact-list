export const contactDetailsItem = [{
    firstName: 'test',
    lastName: 'last',
    id: '1',
    phone: [{ type: 'Phone', digit: '324342' }],
    notes: '',
    emergencyContact: true,
    image: null
}]

export const contactDetailsWithImage = [{
    firstName: 'test',
    lastName: 'last',
    id: '1',
    phone: [{ type: 'Phone', digit: '324342' }],
    notes: '',
    emergencyContact: false,
    image: 'test-image'
}]

export const contactDetailMultipleNum = [{
    firstName: 'test',
    lastName: 'last',
    id: '1',
    phone: [{ type: 'Phone', digit: '324342' },
    { type: 'Phone', digit: '231312' }],
    notes: '',
    emergencyContact: false,
    image: 'testImage'
}]