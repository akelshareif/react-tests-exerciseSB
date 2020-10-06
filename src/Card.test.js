import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Card from './Card';

it('Should render without crashing', () => {
    render(<Card />);
});

it('Should match snapshot', () => {
    const { asFragment } = render(<Card />);
    expect(asFragment()).toMatchSnapshot();
});
