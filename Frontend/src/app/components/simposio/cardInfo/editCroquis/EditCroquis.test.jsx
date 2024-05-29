// Importa la función que quieres probar
import React from 'react';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import EditCroquis from './EditCroquis';



  it('should render EditCroquis', () => {
    render(<EditCroquis imageName={'as'} high_contrast={true}/>);
    expect(screen.getByText("Editar")).toBeInTheDocument();
  });

