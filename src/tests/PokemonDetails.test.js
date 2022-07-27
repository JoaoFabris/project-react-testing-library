import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './Utils/renderWithRouter';

describe('Testando o componente PokemonDetails', () => {
  test('informações do pokémon selecionado são mostradas na tela:', () => {
    renderWithRouter(<App />);
    const details = screen.getByText(/more details/i);
    userEvent.click(details);
    const title = screen.getByRole('heading', { name: /details/i });
    expect(title).toBeInTheDocument();
    expect(details).not.toBeInTheDocument();
    const summary = screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    });
    expect(summary).toBeInTheDocument();
    const text = screen.getByText(/pokémon roasts /i);
    expect(text).toBeInTheDocument();
  });
});
