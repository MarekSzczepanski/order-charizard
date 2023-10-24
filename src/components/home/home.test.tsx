import React from 'react';
import user from '@testing-library/user-event';
import { render, screen, waitFor } from '../../test-utils';
import Home from './home';

const getButton = () => screen.getByRole('button');

const checkDocumentBeing = (item: HTMLElement | null) =>
  expect(item).toBeInTheDocument();

describe('heading', () => {
  test('renders heading', () => {
    render(<Home />);
    const heading = screen.getByRole('heading');
    checkDocumentBeing(heading);
  });
});

describe('button', () => {
  beforeEach(() => {
    render(<Home />);
  });
  test('renders button', () => {
    const button = getButton();
    checkDocumentBeing(button);
  });

  test('focuses button', async () => {
    const button = getButton();
    await user.tab();
    expect(button).toHaveFocus();
  });

  test('sends api request after focusing button and pressing enter', async () => {
    await waitFor(() => {
      user.tab();
      user.keyboard('[Enter]');
      const span = screen.getByText(/loading.../i);
      checkDocumentBeing(span);
    });
  });

  test('sends api request after clicking button', async () => {
    await waitFor(() => {
      const button = getButton();
      user.click(button);
      const span = screen.getByText(/loading.../i);
      checkDocumentBeing(span);
    });
  });
});
