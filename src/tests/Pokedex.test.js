import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './Utils/renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokedex.js />', () => {
  it('Teste se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', { name: /encountered pokémons/i });
    expect(heading).toBeInTheDocument();
  });

  it('pokémon da lista quando o botão Próximo pokémon é clicado', () => {
    renderWithRouter(<App />);
    const char = screen.getAllByTestId('pokemon-name');
    const test = 1;
    expect(char.length).toBe(test);
  });
  it('Teste se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);
    const allPokemons = screen.getAllByTestId('pokemon-name');
    expect(allPokemons.length).toBe(1);
  });
  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const test = 7;
    const getAllPok = screen.getAllByTestId(/pokemon-type-button/i);
    expect(getAllPok.length).toBe(test);
  });
  it('Teste se a Pokédex contém um botão para resetar o filtro:', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', { name: /all/i });
    userEvent.click(allButton);
    const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(nextButton).not.toBeDisabled(true);
  });
});
