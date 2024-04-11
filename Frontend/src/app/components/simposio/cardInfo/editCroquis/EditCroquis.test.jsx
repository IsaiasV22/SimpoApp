// Importa la función que quieres probar
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EditCroquis from './EditCroquis';


describe('EditCroquis', () => {
  test('renders modal correctly', () => {
    render(<EditCroquis imageName="example" high_contrast={false} />);

    // Verificar que el botón "Editar" esté presente
    const editButton = screen.getByText('Editar');
    expect(editButton).toBeInTheDocument();

    // Verificar que el modal no esté visible inicialmente
    const modalTitle = screen.queryByText('Editar Croquis');
    expect(modalTitle).not.toBeInTheDocument();

    // Hacer clic en el botón "Editar"
    userEvent.click(editButton);

    // Verificar que el modal esté visible después de hacer clic en el botón "Editar"
    expect(modalTitle).toBeInTheDocument();
  });
});
