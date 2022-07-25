import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './Utils/renderWithRouter';
import About from '../pages/About';

describe('2. Teste o componente <About.js />.', () => {
  it('teste se a página contém as informações sobre a Pokédex;', () => {
    renderWithRouter(<About />);
    const section = screen.getByRole('heading', { name: /Pokédex/i });
    expect(section).toBeInTheDocument();
  });
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const section = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });
    expect(section).toBeInTheDocument();
  });
  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const section = screen.getAllByText(/Pokémons/i);
    expect(section).toHaveLength(2);
  });
  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
