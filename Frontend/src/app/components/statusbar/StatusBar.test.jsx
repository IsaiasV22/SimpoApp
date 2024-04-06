import {render, screen, fireEvent} from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import StatusBar from './StatusBar';

//should have text Status
it('should have text Status', () => {
    render(<StatusBar />);
    expect(screen.getByText('Status')).toBeInTheDocument();
    });

/*   // Prueba para verificar que se actualiza el estado al seleccionar una opción
  it('should update status when selecting an option', () => {
    render(<StatusBar />);
    const dropdown = screen.getByText('Status');
    fireEvent.click(dropdown);
    const option = screen.getByText('In progress');
    fireEvent.click(option);
    expect(screen.getByText('In progress')).toBeInTheDocument();
  }); */
  
