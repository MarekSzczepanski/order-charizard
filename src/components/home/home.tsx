import React, { useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Formik } from 'formik';
import { Typography, Box, CircularProgress } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import changeStep from '../../actions/stepAction';
import saveDataOfDrawnCards from '../../actions/cardsAction';
import StyledButton from '../../styled/button';
import { colors, api } from '../../utils/globalVariables';

const cardsCount = 3;

const requestCards = () => axios.get(`${api}/cards?q=name:charizard`);

const drawThreeRandomCards = (min: 0, max: number) => {
  const numbers: number[] = [];
  for (let i = 0; i < cardsCount; i += 1) {
    numbers.push(Math.floor(Math.random() * (max - min + 1) + min));
  }
  return numbers;
};

const getDrawnCardsData = (res: AxiosResponse) => {
  const cardsData = [];
  const { count, data } = res.data;
  const drawnNumbers = drawThreeRandomCards(0, count);

  for (let i = 0; i < cardsCount; i += 1) {
    const card = data[drawnNumbers[i]];
    cardsData[i] = {
      name: card.name,
      image: card.images.large,
      price: card.cardmarket.prices.averageSellPrice,
      url: card.cardmarket.url,
      setName: card.set.name,
      setLogo: card.set.images.logo,
    };
  }
  return cardsData;
};

function Home() {
  const step = useSelector((state: RootState) => state.step);
  const dispatch = useDispatch();
  const { data, isError, error, isFetching, refetch } = useQuery({
    queryKey: ['cards'],
    queryFn: () => requestCards(),
    enabled: false,
  });

  useEffect(() => {
    if (data && step.value < 1) {
      dispatch(changeStep(step.value + 1));
      dispatch(saveDataOfDrawnCards(getDrawnCardsData(data)));
    }
  }, [data, dispatch, step.value]);

  const renderApiCallStatusText = () => {
    if (isFetching) return 'loading...';
    if (isError && error instanceof Error) return error.message;
    return null;
  };

  return (
    <section>
      <Box
        sx={{
          margin: '0 auto',
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: 'max(2rem, 2.5vw)',
            fontWeight: '800',
            lineHeight: 'max(3rem, 3.5vw)',
            textAlign: 'center',
            textTransform: 'uppercase',
            color: colors.color1,
          }}
        >
          order charizard
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Formik
          initialValues={{ email: '' }}
          onSubmit={(values, { setSubmitting }) => {
            refetch();
            setTimeout(() => {
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <form onSubmit={(e) => handleSubmit(e)}>
              <StyledButton
                type="submit"
                disabled={isSubmitting}
                variant="contained"
              >
                let&lsquo;s go!
              </StyledButton>
            </form>
          )}
        </Formik>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginTop: 'max(1rem, 1.5vw)',
          }}
        >
          <Typography
            color={colors.color1}
            sx={{ marginRight: 'max(.5rem, 1vw)' }}
          >
            {renderApiCallStatusText()}
          </Typography>
          {isFetching && <CircularProgress size={15} />}
        </Box>
      </Box>
    </section>
  );
}

export default Home;
