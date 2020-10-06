import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Carousel from './Carousel';

it('renders without crashing', () => {
    render(<Carousel />);
});

it('should match snapshot', () => {
    const { asFragment } = render(<Carousel />);
    expect(asFragment()).toMatchSnapshot();
});

it('works when you click on the right arrow', function () {
    const { queryByTestId, queryByAltText } = render(<Carousel />);

    // expect the first image to show, but not the second
    expect(queryByAltText('Photo by Richard Pasquarella on Unsplash')).toBeInTheDocument();
    expect(queryByAltText('Photo by Pratik Patel on Unsplash')).not.toBeInTheDocument();

    // move forward in the carousel
    const rightArrow = queryByTestId('right-arrow');
    fireEvent.click(rightArrow);

    // expect the second image to show, but not the first
    expect(queryByAltText('Photo by Richard Pasquarella on Unsplash')).not.toBeInTheDocument();
    expect(queryByAltText('Photo by Pratik Patel on Unsplash')).toBeInTheDocument();
});

it('works when you click the left arrow', () => {
    const { queryByTestId, queryByAltText } = render(<Carousel />);

    // move forward in the carousel
    const rightArrow = queryByTestId('right-arrow');
    fireEvent.click(rightArrow);

    // move backward in the carousel
    const leftArrow = queryByTestId('left-arrow');
    fireEvent.click(leftArrow);

    // expect the second image to show, but not the first
    expect(queryByAltText('Photo by Richard Pasquarella on Unsplash')).toBeInTheDocument();
    expect(queryByAltText('Photo by Pratik Patel on Unsplash')).not.toBeInTheDocument();
});

it('should not show left arrow when on first image', () => {
    const { queryByTestId } = render(<Carousel />);
    const leftArrow = queryByTestId('left-arrow');

    expect(leftArrow).not.toBeInTheDocument();
});

it('should not show right arrow when on last image', () => {
    const { queryByTestId } = render(<Carousel />);
    const rightArrow = queryByTestId('right-arrow');

    // move forward to last image in the carousel
    fireEvent.click(rightArrow);
    fireEvent.click(rightArrow);

    expect(rightArrow).not.toBeInTheDocument();
});
