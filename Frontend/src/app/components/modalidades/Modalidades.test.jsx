import {render, screen, fireEvent} from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import Modalidades from './Modalidades';
import { mockTalleres } from './__mocks__/talleres';
// Mock del módulo de talleres

//check if h1 Modalities is present in the component
it('should have text Modalities', () => {
    render(<Modalidades talleres={mockTalleres} elementId={666} />);
    expect(screen.getByText('Modalities')).toBeInTheDocument();
    });