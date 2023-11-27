import React, { useState } from 'react';
import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material';

import { getSearchResults } from '../../api/tvSeries';
import { Show } from '../../types/show';

import { ErrorAlert, LoadingContainer, Header } from '../../components';
import SeriesListingCard from './SeriesListingCard';

const SearchPage = () => {
  const [search, setSearch] = useState('');
  const [shows, setShows] = useState<Show[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchTvSeries = () => {
    setIsLoading(true);
    getSearchResults(search)
      .then((result) => setShows(result))
      .catch((error) => {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage('An unknown error occurred');
        }
      })
      .finally(() => setIsLoading(false));
  };

  const hasError = errorMessage !== undefined && errorMessage !== '';

  return (
    <>
      <Header>
        <Stack
          sx={{ height: '100%' }}
          className="main-content"
          direction="column"
          justifyContent="space-between"
        >
          <Typography
            variant="h3"
            component="h3"
            sx={{ alignSelf: 'center', marginTop: 2 }}
          >
            Search Tv Series
          </Typography>
          <Stack direction="row" spacing={2} sx={{ margin: 2 }}>
            <TextField
              label="Search"
              variant="filled"
              fullWidth
              value={search}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setSearch(event.target.value);
              }}
              sx={{ background: 'white', borderRadius: 2 }}
            />
            <Button
              data-testid="search-button"
              variant="contained"
              onClick={fetchTvSeries}
            >
              Search
            </Button>
          </Stack>
        </Stack>
      </Header>
      {isLoading && <LoadingContainer />}
      {!isLoading && (
        <Box className="main-content" sx={{ width: '100vw', marginTop: 2 }}>
          {hasError && (
            <ErrorAlert
              title={'Could not find tv series'}
              message={errorMessage}
            />
          )}
          {!hasError && (
            <Grid container spacing={2} justifyContent="center">
              {shows.map((item) => (
                <Grid item key={item.id}>
                  <SeriesListingCard show={item} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      )}
    </>
  );
};

export default SearchPage;
