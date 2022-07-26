import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { FavoritePokemons } from '../pages';
import renderWithRouter from './Utils/renderWithRouter';

describe('3. Teste o componente <FavoritePokemons.js />', () => {
  it('Teste se é exibida na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);
    const msg = screen.getByText(/No favorite pokemon found/i);
    expect(msg).toBeInTheDocument();
  });
  it('Teste se são exibidos todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /More details/i });
    userEvent.click(details);
    const favoriteCheckBox = screen.getByLabelText(/Pokémon favoritado/i);
    userEvent.click(favoriteCheckBox);
    const favoriteLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(favoriteLink);
    const favoritPokemon = screen.getByText(/Pikachu/i);
    expect(favoritPokemon).toBeInTheDocument();
  });
});
