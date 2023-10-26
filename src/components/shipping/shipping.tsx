import React from 'react';
import { useFormik } from 'formik';
import { styled } from '@mui/material/styles';
import StyledButton from '../../styled/button';
import H2 from '../typography/h2';
import { colors } from '../../utils/globalVariables';
import IFormValues from '../../interfaces/formValues';

const Form = styled('form')`
  max-width: 90vw;
  @media (max-width: 1023px) {
    padding-top: 3rem;
  }
  display: flex;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 1023px) {
    flex-direction: column;
  }
  @media (min-width: 1024px) {
    padding: 7rem 0;
  }
`;
const Inputs = styled('section')`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-self: center;
  width: 50%;
  padding: 2rem;
  border-radius: 1rem;
  background-color: ${colors.color4};
  > h2 {
    width: 100%;
    color: ${colors.color5};
  }
  > input {
    width: 100%;
  }
  @media (max-width: 1023px) {
    width: min(90vw, 500px);
  }
`;
type InputProps = {
  widthVal?: string;
};
const InputWrap = styled('div')<InputProps>(({ widthVal }) => ({
  width: widthVal || '100%',
}));
const Label = styled('label')`
  display: block;
  padding-top: 1rem;
  text-transform: capitalize;
  color: ${colors.color1};
`;
const Input = styled('input')`
  width: 100%;
  height: max(2rem, 3vw);
  border: 0;
  border-radius: 6px;
  text-indent: 10px;
  &:focus-visible {
    outline: none;
    background-color: ${colors.color5};
  }
`;
const ErrorMessage = styled('div')`
  padding-top: 0.3rem;
  color: crimson;
`;

function Shipping({ ...props }: { onSubmit: (values: IFormValues) => void }) {
  const formik = useFormik<{
    name: string;
    surname: string;
    phone: string;
    email: string;
    birth: string;
    adress: string;
    city: string;
    state: string;
    zipCode: string;
  }>({
    initialValues: {
      name: '',
      surname: '',
      phone: '',
      email: '',
      birth: '',
      adress: '',
      city: '',
      state: '',
      zipCode: '',
    },
    onSubmit: (values) => props.onSubmit(values),
    validate: (values) => {
      const errors: IFormValues = {};
      const {
        name,
        surname,
        phone,
        email,
        birth,
        adress,
        city,
        state,
        zipCode,
      } = values;

      if (!name) errors.name = 'Required';
      else if (name.length < 2) errors.name = 'Name is too short';

      if (!surname) errors.surname = 'Required';
      else if (surname.length < 2) errors.surname = 'Surname is too short';

      if (!phone) errors.phone = 'Required';
      else if (
        !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{3,6}$/im.test(phone)
      )
        errors.phone = 'Phone number has invalid format';
      if (!email) errors.email = 'Required';
      else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        errors.email = 'Email adress has invalid format';
      }

      if (!birth) errors.birth = 'Required';
      else if (!/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/.test(birth))
        errors.birth = 'Birth date has invalid format';

      if (!adress) errors.adress = 'Required';
      else if (adress.length < 5) errors.adress = 'Adress is too short';

      if (!city) errors.city = 'Required';
      else if (city.length < 2) errors.city = 'City name is too short';

      if (!state) errors.state = 'Required';
      else if (state.length < 4) errors.state = 'State name is too short';

      if (!zipCode) errors.zipCode = 'Required';
      else if (zipCode.length < 5) errors.zipCode = 'Zip Code is too short';
      else if (!/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipCode))
        errors.zipCode = 'Please enter only numbers';

      return errors;
    },
  });

  const errs = formik.errors;
  const touches = formik.touched;
  const shortInputWidth = '49%';

  const inputsData = [
    {
      name: 'name',
      err: errs.name,
      touched: touches.name,
      width: shortInputWidth,
    },
    {
      name: 'surname',
      err: errs.surname,
      touched: touches.surname,
      width: shortInputWidth,
    },
    {
      name: 'phone',
      err: errs.phone,
      touched: touches.phone,
    },
    {
      name: 'email',
      err: errs.email,
      touched: touches.email,
    },
    {
      name: 'birth',
      placeholder: 'DD/MM/YYYY',
      err: errs.birth,
      touched: touches.birth,
    },
    {
      name: 'adress',
      err: errs.adress,
      touched: touches.adress,
    },
    {
      name: 'city',
      err: errs.city,
      touched: touches.city,
    },
    {
      name: 'state',
      err: errs.state,
      touched: touches.state,
      width: shortInputWidth,
    },
    {
      name: 'zipCode',
      err: errs.zipCode,
      touched: touches.zipCode,
      width: shortInputWidth,
    },
  ];

  const renderInputs = () =>
    inputsData.map((input) => {
      const { name, err, touched, placeholder, width } = input;
      return (
        <InputWrap key={name} widthVal={width}>
          <Label htmlFor={name} data-testid="label">
            {name}
          </Label>
          <Input
            type="text"
            id={name}
            name={name}
            placeholder={placeholder || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            role="textbox"
          />
          {err && touched ? <ErrorMessage>{err}</ErrorMessage> : null}
        </InputWrap>
      );
    });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Inputs>
        <H2 text="shipping details" />
        {renderInputs()}
      </Inputs>
      <StyledButton
        type="submit"
        variant="contained"
        disabled={!formik.isValid}
      >
        submit
      </StyledButton>
    </Form>
  );
}

export default Shipping;
