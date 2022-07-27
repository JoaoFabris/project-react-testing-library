import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './Utils/renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const card = screen.getByRole('img', { name: /Pikachu sprite/i });
    const name = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    expect(card).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(type.textContent).toBe('Electric');
    expect(card.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  it('Teste se o card do pokémon indicado na Pokédex contém um link de navegação', () => {
    renderWithRouter(<App />);
    const details = screen.getByText(/more details/i);
    userEvent.click(details);
    const favPok = screen.getByLabelText(/Pokémon favoritado/i);
    userEvent.click(favPok);
    const img = screen.getByRole('img',
      { name: /pikachu is marked as favorite/i });
    expect(img).toBeInTheDocument();
    expect(img.src).toContain('/star-icon.svg');
  });
  it('Redirecionamento da aplicação para a página de detalhes de pokémon', () => {
    renderWithRouter(<App />);
    const btn = screen.getByRole('button', { name: /Próximo pokémon/i });
    const link = screen.getByRole('link', { name: /More details/i });
    userEvent.click(btn);
    userEvent.click(link);
    const char = screen.getByRole('heading', { name: /charmander details/i });
    expect(char).toBeDefined();
  });
  it('Teste também se a URL exibida no navegador muda para /pokemon/<id>', () => {
    const { history } = renderWithRouter(<App />);
    const details = screen.getByText(/more details/i);
    userEvent.click(details);
    expect(history.location.pathname).toBe('/pokemons/25');
  });
  it('Teste se existe um ícone de estrela nos pokémons favoritados:', () => {
    renderWithRouter(<App />);
    const btn = screen.getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(btn);
    const details = screen.getByRole('link', { name: /More details/i });
    userEvent.click(details);
    const favPok = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(favPok);
    const star = screen.getByAltText('Charmander is marked as favorite').src;
    expect(star).toContain('/star-icon.svg');
  });
});
