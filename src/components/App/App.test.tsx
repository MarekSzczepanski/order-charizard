import React from 'react';
import { render, screen } from '../../test-utils';
import App from './App';

describe('footer', () => {
  test('renders footer', () => {
    render(<App />);
    const footer = screen.getByText(
      'Pokemon icons created by Nikita Golubev - Flaticon',
    );
    expect(footer).toBeInTheDocument();
  });
});

describe('images', () => {
  test('renders pokeball images', () => {
    render(<App />);
    const images = screen.getAllByAltText('pokeball');
    expect(images).toHaveLength(2);
  });
});
