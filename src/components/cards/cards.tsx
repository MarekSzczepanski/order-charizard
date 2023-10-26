import React, { useState } from 'react';
import { Button, Box, Link } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CancelIcon from '@mui/icons-material/Cancel';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import setChosenCard from '../../actions/chosenCardAction';
import changeStep from '../../actions/stepAction';
import { RootState } from '../../store';
import StyledButton from '../../styled/button';
import H2 from '../typography/h2';
import H3 from '../typography/h3';
import { colors } from '../../utils/globalVariables';

const Img = styled('img')`
  width: 50%;
`;
const CardsContainer = styled('div')`
  display: flex;
  margin-top: 2rem;
  @media (max-width: 1023px) {
    flex-direction: column;
    align-items: center;
  }
  @media (min-width: 1024px) {
    justify-content: space-evenly;
    padding: 0 2vw;
  }
`;
const CardWrap = styled('div')`
  box-shadow: #030303 0px 6vmax 6vmax -3vmax;
  transition: box-shadow 0.2s ease-in;
  cursor: pointer;
  &:hover {
    box-shadow: ${colors.color5} 0px 5vmax 4vmax -3vmax;
  }
  &.chosen {
    box-shadow: ${colors.color6} 0px 5vmax 4vmax -3vmax;
  }
  @media (max-width: 1023px) {
    width: min(300px, 70vw);
    height: min(400px, 90vw);
    margin: 5vw auto;
    img {
      width: auto;
      height: min(200px, 60vw);
      object-fit: contain;
    }
  }
  @media (min-width: 1024px) {
    width: 25vw;
    height: 25vw;
    img {
      width: auto;
      height: 16vw;
      object-fit: contain;
    }
  }
`;
const Section = styled('section')`
  display: flex;
  flex-direction: column;
  min-width: 85vw;
  > h2 {
    text-align: center;
  }
  @media (max-width: 1023px) {
    margin-top: 25vh;
  }
`;
const Modal = styled('article')`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50vh;
  left: 50vw;
  width: 90vw;
  height: 75vh;
  padding-bottom: 2rem;
  transform: translate(-50%, -55%);
  background-color: ${colors.color1};
  border: solid 8px ${colors.color5};
  overflow-y: scroll;
`;
const ModalSection = styled('section')`
  display: flex;
  flex-direction: column;
  align-items: center;
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  img {
    max-width: 30%;
    margin-top: 2rem;
  }
  @media (min-width: 1024px) {
    width: 50%;
  }
  @media (max-width: 1023px) {
    &:last-of-type {
      margin-top: 2rem;
    }
  }
`;
const ModalSectionWrap = styled('div')`
  display: flex;
  @media (max-width: 1023px) {
    flex-direction: column;
  }
`;

const chooseCard = (id: number, dispatch: Function) => {
  dispatch(setChosenCard(id));
};

const toggleModal = (setIsModalActive: Function, isModalActive: boolean) => {
  setIsModalActive(!isModalActive);
};

const confirmChoice = (dispatch: Function) => {
  dispatch(changeStep(2));
};

function Cards() {
  const cards = useSelector((state: RootState) => state.cards.value);
  const chosenCard = useSelector((state: RootState) => state.chosenCard.value);
  const chosenCardData = cards[chosenCard];
  const dispatch = useDispatch();
  const [isModalActive, setIsModalActive] = useState(false);

  const renderLayoutCards = () => {
    const layoutCards = [];

    for (let i = 0; i < 3; i += 1) {
      const imgUrl = cards[i].image;
      layoutCards.push(
        <CardWrap
          onClick={() => chooseCard(i, dispatch)}
          className={chosenCard === i ? 'chosen' : ''}
          key={i}
          data-testid={`card${i}`}
        >
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: '100%',
              overflowY: 'auto',
              backgroundColor: colors.color1,
            }}
          >
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingTop: '1rem',
                paddingBottom: '0',
              }}
            >
              <Img src={imgUrl} alt={imgUrl} />
              <H3 text={cards[i].name} />
            </CardContent>
            <CardActions>
              <Button
                onClick={() => toggleModal(setIsModalActive, isModalActive)}
                type="button"
                size="small"
                color="warning"
                sx={{ fontSize: 'max(.8rem, .8vw)', fontWeight: '700' }}
              >
                show details
              </Button>
            </CardActions>
          </Card>
        </CardWrap>,
      );
    }

    return layoutCards;
  };

  return (
    <Section>
      <H2 text="choose your card" />
      <CardsContainer>{renderLayoutCards()}</CardsContainer>
      <StyledButton
        onClick={() => confirmChoice(dispatch)}
        disabled={chosenCard < 0}
        type="button"
        variant="contained"
      >
        proceed to shipment
      </StyledButton>
      {isModalActive && (
        <Modal>
          <CancelIcon
            onClick={() => toggleModal(setIsModalActive, isModalActive)}
            className="cancel-icon"
            data-testid="cancel-icon"
            sx={{
              alignSelf: 'flex-end',
              position: 'sticky',
              top: '1rem',
              margin: '1rem',
              transision: 'color .2s ease-in',
              cursor: 'pointer',
            }}
          />
          <ModalSectionWrap>
            <ModalSection>
              <Box>
                <H2 text="chosen card:" isDark />
                <Img src={chosenCardData.image} alt={chosenCardData.image} />
                <Link
                  href={chosenCardData.setLogo}
                  target="_blank"
                  fontSize="max(1rem, 1.5vw)"
                  sx={{
                    maxWidth: '75%',
                    margin: '1rem auto 0',
                    textAlign: 'center',
                    color: colors.color3,
                  }}
                >
                  {chosenCardData.name}
                </Link>
              </Box>
              <Box sx={{ marginTop: '1rem', width: '100%' }}>
                <H3 text="Cardmarket Price:" textSize="max(1.2rem, 1.8vw)" />
                <Link
                  href={chosenCardData.url}
                  target="_blank"
                  color={colors.color6}
                  sx={{
                    maxWidth: '70%',
                    marginTop: '0.5rem',
                    fontSize: 'max(1.1rem, 1.6vw)',
                    wordWrap: 'break-word',
                  }}
                >
                  € {chosenCardData.price}
                </Link>
              </Box>
            </ModalSection>
            <ModalSection>
              <H2 text="Included in:" isDark />
              <Img src={chosenCardData.setLogo} alt={chosenCardData.setName} />
              <H3 text={chosenCardData.setName} />
            </ModalSection>
          </ModalSectionWrap>
        </Modal>
      )}
    </Section>
  );
}

export default Cards;
