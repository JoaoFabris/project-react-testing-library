import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './Utils/renderWithRouter';
import pokemons from '../data';

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
  test('Seção contendo um mapa com a localização do pokémon', () => {
    renderWithRouter(<App />);

    const details = screen.getByText(/more details/i);
    userEvent.click(details);
    const pokemonLocation = screen.getByRole('heading',
      { level: 2, name: /game locations of pikachu/i });
    expect(pokemonLocation);
    const imgLocation = screen.getAllByAltText(/pikachu location/i);
    imgLocation.forEach((img, index) => {
      expect(img.src).toBe(pokemons[0].foundAt[index].map);
    });
    const favPok = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(favPok).toBeInTheDocument();
  });
  test('Se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);
    const details = screen.getByText(/more details/i);
    userEvent.click(details);
    const fav = screen.getByLabelText('Pokémon favoritado?');
    expect(fav).toBeDefined();
    userEvent.click(fav);
    const pok = screen.getByAltText('Pikachu is marked as favorite');
    expect(pok).toBeDefined();
  });
});
