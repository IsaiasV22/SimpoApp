import React from 'react';
import '@testing-library/jest-dom';
import {render} from '@testing-library/react';
import Calendario from './calendario';

test('renders content', () => {
  const component = render(<Calendario/>);
  expect(component.container).toHaveTextContent('Calendario');
});