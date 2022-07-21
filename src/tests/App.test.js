import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './Utils/renderWithRouter';

describe('Teste o componente <App.js />', () => {
  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    const home = screen.getByRole('link', {
      name: /home/i,
    });
    const about = screen.getByRole('link', {
      name: /about/i,
    });
    const favPok = screen.getByRole('link', {
      name: /favorite/i,
    });
    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favPok).toBeInTheDocument();
  });
  it('redirecionada para a página inicial pelo link Home da barra de navegação;', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /home/i });
    userEvent.click(home);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });
  it('About, na URL /about, ao clicar no link About da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: /about/i });
    userEvent.click(about);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });
  it('URL /favorites ao clicar no link Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);
    const favPok = screen.getByRole('link', { name: /favorite/i });
    userEvent.click(favPok);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });
  it('Not Found ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/notfound');
    const pageNotFound = screen
      .getByRole('heading', { name: /page requested not found/i, level: 2 });
    expect(pageNotFound).toBeInTheDocument();
  });
});
