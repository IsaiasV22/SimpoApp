import {render, screen, fireEvent, act} from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import AccessibilityDropdown from './AccessibilityDropdown';
//global high contrast state
import useGlobalState from "../globalState/GlobalState";


describe('AccessibilityDropdown component', () => {
  it('renders the component with high contrast mode switch', () => {
    render(<AccessibilityDropdown />);

    // act to click the dropdown button
    act(() => {
        fireEvent.click(screen.getByText('Accesibility'));
    });
    // expect to find the text 'High contrast mode' in the dropdown
    expect(screen.getByText('High contrast mode')).toBeInTheDocument();

  });


});
