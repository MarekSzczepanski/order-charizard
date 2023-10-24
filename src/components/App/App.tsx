import React from 'react';
import { styled } from '@mui/material/styles';
import pokeball from '../../assets/pokeball.png';
import Home from '../home/home';
import { colors } from '../../utils/globalVariables';

const Img = styled('img')`
  position: absolute;
  top: 10vh;
  left: 10vw;
  width: 13vmax;
  height: auto;
  transform: rotate(-30deg);
`;
const Img2 = styled('img')`
  position: absolute;
  bottom: -8vh;
  right: -8vw;
  width: 26vmax;
  height: auto;
  transform: rotate(30deg);
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
  background-color: gray;
  z-index: 2;
  > a {
    max-width: 90vw;
    color: ${colors.color1};
  }
`;

function App() {
  return (
    <div className="App">
      <Home />
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
