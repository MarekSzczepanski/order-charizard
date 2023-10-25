import React from 'react';
import user from '@testing-library/user-event';
import { render, screen, act, fireEvent } from '../../test-utils';
import Shipping from './shipping';

const checkLength = (items: HTMLElement[], length: number) =>
  expect(items).toHaveLength(length);

const isInputErrorShown = async (
  inputName: string,
  val: string,
  errMessage: string,
  shouldError?: boolean,
) => {
  const input = screen.getByRole('textbox', { name: inputName });
  await user.type(input, val);
  await user.tab();
  const errorMessage = screen.queryByText(new RegExp(errMessage, 'i'));
  return shouldError
    ? expect(errorMessage).toBeInTheDocument()
    : expect(errorMessage).not.toBeInTheDocument();
};

const mockOnSubmit = jest.fn();

describe('heading', () => {
  test('renders h2', () => {
    render(<Shipping onSubmit={mockOnSubmit} />);
    const h2 = screen.getAllByRole('heading', { level: 2 });
    checkLength(h2, 1);
  });
});

describe('focus', () => {
  test('focus elements in a proper order', async () => {
    render(<Shipping onSubmit={mockOnSubmit} />);
    const inputs = screen.getAllByRole('textbox');
    for (let i = 0; i < inputs.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await user.tab();
      expect(inputs[i]).toHaveFocus();
    }
    const btn = screen.getByRole('button', { name: 'submit' });
    await user.tab();
    expect(btn).not.toHaveFocus();
  });
});

describe('form', () => {
  beforeEach(() => {
    render(<Shipping onSubmit={mockOnSubmit} />);
  });

  describe('rendering', () => {
    test('renders inputs', () => {
      const inputs = screen.getAllByRole('textbox');
      checkLength(inputs, 9);
    });

    test('renders input labels', () => {
      const labels = screen.getAllByTestId('label');
      checkLength(labels, 9);
    });

    test('renders button', () => {
      const btn = screen.getByRole('button', { name: 'submit' });
      expect(btn).toBeInTheDocument();
    });
  });

  describe('validation', () => {
    describe('empty fields', () => {
      test('shows error when input field is left empty', async () => {
        const inputs = screen.getAllByRole('textbox');
        for (let i = -1; i < inputs.length; i += 1) {
          // eslint-disable-next-line no-await-in-loop
          await user.tab();
        }
        const errorMessages = screen.getAllByText('Required');
        expect(errorMessages).toHaveLength(9);
      });
    });

    const short = 'is too short';
    const invalid = 'has invalid format';

    const inputsData = [
      {
        name: 'name',
        val1: 'x',
        val2: 'xx',
        errMessage: `name ${short}`,
      },
      {
        name: 'surname',
        val1: 'x',
        val2: 'xx',
        errMessage: `surname ${short}`,
      },
      {
        name: 'phone',
        val1: 'x',
        val2: '123456789',
        errMessage: `phone number ${invalid}`,
      },
      {
        name: 'email',
        val1: 'jane.doe#gmail.com',
        val2: 'jane.doe@gmail.com',
        errMessage: `email adress ${invalid}`,
      },
      {
        name: 'birth',
        val1: '01012000',
        val2: '01/01/2000',
        errMessage: `birth date ${invalid}`,
      },
      {
        name: 'adress',
        val1: 'xxxx',
        val2: 'xxxxx',
        errMessage: `adress ${short}`,
      },
      {
        name: 'city',
        val1: 'x',
        val2: 'xx',
        errMessage: `city name ${short}`,
      },
      {
        name: 'state',
        val1: 'xxx',
        val2: 'xxxx',
        errMessage: `state name ${short}`,
      },
      {
        name: 'zipCode',
        val1: 'xxxx',
        val2: 'xxxxx',
        errMessage: `zip code ${short}`,
      },
    ];

    for (let i = 0; i < 9; i += 1) {
      const { name, val1, val2, errMessage } = inputsData[i];
      // eslint-disable-next-line @typescript-eslint/no-loop-func
      describe(name, () => {
        test(`shows error when ${errMessage}`, async () => {
          await isInputErrorShown(`${name}`, `${val1}`, `${errMessage}`, true);
        });

        test(`doesn't show error when ${errMessage}`, async () => {
          await isInputErrorShown(`${name}`, `${val2}`, `${errMessage}`);
        });

        if (name === 'zipCode') {
          test('shows error when zip code is not only numbers', async () => {
            await isInputErrorShown(
              `${name}`,
              '12345a',
              'Please enter only numbers',
              true,
            );
          });

          test("doesn't show error when zip code only numbers", async () => {
            await isInputErrorShown(
              `${name}`,
              '12345',
              'Please enter only numbers',
            );
          });
        }
      });
    }
  });

  describe('submition', () => {
    test('calls onSubmit when all fields pass validation', async () => {
      await act(async () => {
        const textBoxesData = [
          { name: 'name', value: 'Jane' },
          { name: 'surname', value: 'Doe' },
          { name: 'phone', value: '123456789' },
          { name: 'email', value: 'jane.doe@gmail.com' },
          { name: 'birth', value: '01/01/2000' },
          { name: 'adress', value: 'super street 5' },
          { name: 'city', value: 'Chicago' },
          { name: 'state', value: 'Illinois' },
          { name: 'zipCode', value: '12345' },
        ];

        const { length } = textBoxesData;
        for (let i = 0; i < length; i += 1) {
          // for in loop causes some TS problems here
          const data = textBoxesData[i];
          fireEvent.change(screen.getByRole('textbox', { name: data.name }), {
            target: { value: data.value },
          });
        }
      });

      await act(async () => {
        const btn = screen.getByText('submit');
        fireEvent.click(btn);
      });

      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
