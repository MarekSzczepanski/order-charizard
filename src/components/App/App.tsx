import React from 'react';
import axios from 'axios';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import changeStep from '../../actions/stepAction';
import pokeball from '../../assets/pokeball.png';
import Home from '../home/home';
import Cards from '../cards/cards';
import Shipping from '../shipping/shipping';
import { colors } from '../../utils/globalVariables';
import IFormValues from '../../interfaces/formValues';

const Img = styled('img')`
  position: absolute;
  top: 10vh;
  left: 10vw;
  width: 13vmax;
  height: auto;
  transform: rotate(-30deg);
  z-index: -1;
`;
const Img2 = styled('img')`
  position: absolute;
  bottom: -8vh;
  right: -8vw;
  width: 26vmax;
  height: auto;
  transform: rotate(30deg);
  z-index: -1;
`;
const Footer = styled('footer')`
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  max-width: 100vw;
  padding: 20px 0;
  background-color: ${colors.color4};
  z-index: 2;
  > a {
    max-width: 90vw;
    color: ${colors.color1};
  }
`;

function App() {
  const step = useSelector((state: RootState) => state.step);
  const useSignupMutation = () =>
    useMutation({
      mutationFn: (formPayload: IFormValues) =>
        axios.post('https://jsonplaceholder.typicode.com/users', formPayload),
    });

  const { mutate } = useSignupMutation();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const renderProperSection = () => {
    const onSubmit = (values: IFormValues) =>
      mutate(values, {
        onSuccess: () => {
          queryClient.removeQueries();
          dispatch(changeStep(0));
        },
        onError: () => {
          // eslint-disable-next-line no-alert
          alert('An error occured while submiting the form');
        },
      });

    const sections = [<Home />, <Cards />, <Shipping onSubmit={onSubmit} />];
    return sections[step.value];
  };

  return (
    <div className="App">
      {renderProperSection()}
      <Img src={pokeball} alt="pokeball" />
      <Img2 src={pokeball} alt="pokeball" />
      <Footer>
        <a
          href="https://www.flaticon.com/free-icons/pokemon"
          title="pokemon icons"
        >
          Pokemon icons created by Nikita Golubev - Flaticon
        </a>
      </Footer>
    </div>
  );
}

export default App;
