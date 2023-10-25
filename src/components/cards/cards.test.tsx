import React from 'react';
import user from '@testing-library/user-event';
import { render, screen, fireEvent } from '../../test-utils';
import Cards from './cards';
import { colors } from '../../utils/globalVariables';

const getAllDetailsButtons = () =>
  screen.getAllByRole('button', {
    name: 'show details',
  });

const getCards = () => {
  const card0 = screen.getByTestId('card0');
  const card1 = screen.getByTestId('card1');
  const card2 = screen.getByTestId('card2');
  const cards = [card0, card1, card2];
  return cards;
};

const checkDocumentBeing = (item: HTMLElement | null) =>
  expect(item).toBeInTheDocument();

const checkLength = (items: HTMLElement[], length: number) =>
  expect(items).toHaveLength(length);

describe('heading', () => {
  test('renders headings', () => {
    render(<Cards />);
    const h2 = screen.getByRole('heading', { level: 2 });
    checkDocumentBeing(h2);
    const h3 = screen.getAllByRole('heading', { level: 3 });
    checkLength(h3, 3);
  });
});

describe('confirm button', () => {
  beforeEach(() => {
    render(<Cards />);
  });

  test('renders confirm button', () => {
    const btn = screen.getByRole('button', { name: 'proceed to shipment' });
    checkDocumentBeing(btn);
  });

  test('disables confirm button', () => {
    const btn = screen.getByRole('button', { name: 'proceed to shipment' });
    expect(btn).toBeDisabled();
  });
});

describe('details buttons', () => {
  beforeEach(() => {
    render(<Cards />);
  });

  test('renders details buttons', () => {
    const buttons = getAllDetailsButtons();
    checkLength(buttons, 3);
  });

  test('focus buttons in a proper order', async () => {
    const details = getAllDetailsButtons();
    for (let i = 0; i < details.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await user.tab();
      expect(details[i]).toHaveFocus();
    }
  });
});

describe('cards', () => {
  beforeEach(() => {
    render(<Cards />);
  });

  test('hovering cards', () => {
    const cards = getCards();
    for (let i = 0; i < cards.length; i += 1) {
      fireEvent.mouseOver(cards[i]);
      expect(cards[i]).toHaveStyle(
        `box-shadow: ${colors.color5} 0px 5vmax 4vmax -3vmax`,
      );
    }
  });

  test('selecting cards', async () => {
    const cards = getCards();
    for (let i = 0; i < cards.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await user.click(cards[i]);
      expect(cards[i]).toHaveStyle(
        `box-shadow: ${colors.color6} 0px 5vmax 4vmax -3vmax`,
      );
    }
  });
});

describe('modal', () => {
  beforeEach(() => {
    render(<Cards />);
  });

  test('opens modal', async () => {
    const detailsButton = getAllDetailsButtons()[0];
    await user.click(detailsButton);
    const setsHeading = screen.getByRole('heading', {
      name: 'Included in:',
    });
    checkDocumentBeing(setsHeading);
  });

  test('closes modal', async () => {
    const detailsButton = getAllDetailsButtons()[0];
    await user.click(detailsButton);
    const cancelIcon = screen.getByTestId('cancel-icon');
    await user.click(cancelIcon);
    const queryCancelIcon = screen.queryByTestId('cancel-icon');
    expect(queryCancelIcon).not.toBeInTheDocument();
  });

  test('renders modal headings', async () => {
    const detailsButton = getAllDetailsButtons()[0];
    await user.click(detailsButton);
    const h2 = screen.getAllByRole('heading', { level: 2 });
    checkLength(h2, 3);
    const h3 = screen.getAllByRole('heading', { level: 3 });
    checkLength(h3, 5);
  });
});
