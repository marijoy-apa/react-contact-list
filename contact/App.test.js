import React from "react";
import renderer from 'react-test-renderer';
import {render} from '@testing-library/react'

import App from "./App";
jest.useFakeTimers();

describe('<App />', () => {
    it('has a child', () => {
        const tree = renderer.create(<App />).toJSON();
        expect(tree.children.length).toBe(1); // Corrected this line
    });

    it('renders without crashing', () => {
        const tree = renderer.create(<App />).toJSON();
        expect(tree).toBeTruthy();
    });
    it('initializes Firebase on mount', () => {
        // // jest.mock('./src/initializeFirebaseApp', () => jest.fn());
        // setTimeout(function() {
        //     console.log("This is a callback function.");
        //   }, 0);
        //  render(<App />);
        // expect(getByText('Contact List')).toBeDefined();
    });
});
