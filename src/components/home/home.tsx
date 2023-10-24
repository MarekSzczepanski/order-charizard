import React, { useEffect } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Formik } from 'formik';
import { Typography, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import changeStep from '../../actions/stepAction';

const requestCards = () =>
  axios.get(`https://api.pokemontcg.io/v2/cards?q=name:charizard`);

function Home() {
  const step = useSelector((state: RootState) => state.step);
  const dispatch = useDispatch();
  const { data, isError, error, isFetching, refetch } = useQuery({
    queryKey: ['cards'],
    queryFn: () => requestCards(),
    enabled: false,
  });

  useEffect(() => {
    if (data && step.value < 1) dispatch(changeStep(step.value + 1));
    // eslint-disable-next-line
    console.log(data);
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
        <Typography variant="h1">order charizard</Typography>
      </Box>
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
            <button type="submit" disabled={isSubmitting}>
              let&lsquo;s go!
            </button>
          </form>
        )}
      </Formik>

      <span>{renderApiCallStatusText()}</span>
    </section>
  );
}

export default Home;
