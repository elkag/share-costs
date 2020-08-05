import React from 'react';
import TestRenderer from 'react-test-renderer';
import Header from '../Header/Header'

describe('Header Component', () => {
    it('Should render authenticated touts', () => {
        const tree = TestRenderer.create(<Header />).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('Should render non-authenticated touts', () => {

    })
})