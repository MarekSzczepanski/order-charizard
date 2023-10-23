import React from 'react';
import { render, screen } from '../../test-utils';
import App from './App';

test('renders test', () => {
  render(<App />);
  const test = screen.getByText('init');
  expect(test).toBeInTheDocument();
});
