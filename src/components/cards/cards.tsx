import React from 'react';
import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
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
    width: min(400px, 80vw);
    height: min(400px, 80vw);
    margin: 5vw auto;
    img {
      width: auto;
      height: min(200px, 35vw);
      object-fit: contain;
    }
  }
  @media (min-width: 1024px) {
    width: 25vw;
    height: 25vw;
    img {
      width: auto;
      height: 11vw;
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

function Cards() {
  const cards = useSelector((state: RootState) => state.cards.value);

  const renderLayoutCards = () => {
    const layoutCards = [];

    for (let i = 0; i < 3; i += 1) {
      const imgUrl = cards[i].image;
      layoutCards.push(
        <CardWrap key={i} data-testid={`card${i}`}>
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: '100%',
              overflowY: 'auto',
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
      <StyledButton type="button" variant="contained">
        proceed to shipment
      </StyledButton>
    </Section>
  );
}

export default Cards;
