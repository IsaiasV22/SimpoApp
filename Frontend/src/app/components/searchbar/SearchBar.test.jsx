import {render, screen, fireEvent} from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import SearchBar from './SearchBar';

//should have text Search by
it('should have text Search by', () => {
    render(<SearchBar />);
    expect(screen.getByText('Search by')).toBeInTheDocument();
    });

  // Prueba para verificar que se actualiza el texto de búsqueda al escribir en el input
  it('should update search text when typing', () => {
    //mock dispatch function
    const dispatch = jest.fn();
    render(<SearchBar dispatch={dispatch} />);
    const input = screen.getByPlaceholderText('Search');

    fireEvent.change(input, { target: { value: 'example' } });

    expect(input.value).toBe('example');
  });

    // Prueba para verificar que se llama a la función de búsqueda al hacer clic en el botón de búsqueda
    it('should call search function when clicking on Search button', () => {
        const mockDispatch = jest.fn();
        render(<SearchBar dispatch={mockDispatch} dia_inicio="2024-03-12" />);
    
        const searchButton = screen.getByText('Search');
        fireEvent.click(searchButton);
    
        expect(mockDispatch).toHaveBeenCalledWith({
          type: 'UpdateModeAndValue',
          mode: 'Title',
          value: '',
        });
      });