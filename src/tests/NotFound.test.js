import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './Utils/renderWithRouter';
import { NotFound } from '../pages';

describe('2. Teste o componente <About.js />.', () => {
  it('Testa se a página contém um heading h2 com o texto de erro', () => {
    renderWithRouter(<NotFound />);
    const textPage = screen.getByText('Page requested not found');
    expect(textPage).toBeInTheDocument();
  });
  it('Teste se a página mostra a imagem', () => {
    renderWithRouter(<NotFound />);
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(src);
  });
});
