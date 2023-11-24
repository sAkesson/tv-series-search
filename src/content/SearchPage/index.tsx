import { Button, Paper, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';
import { getSearchResults } from '../../api/tvSeries';
import { Show } from '../../types/show';
import ShowItem from './ShowItem';

const SearchPage = () => {
  const [search, setSearch] = useState('');
  const [shows, setShows] = useState<Show[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTvSeries = () => {
    setIsLoading(true);
    getSearchResults(search)
      .then((result) => setShows(result))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <Paper
        elevation={0}
        square
        sx={{
          width: '100%',
          height: 150,
          backgroundColor: '#142433',
          color: '#fff',
        }}
      >
        Search Tv Series
        <Stack direction="row" spacing={2}>
          <TextField
            label="Search tv series"
            variant="filled"
            fullWidth
            value={search}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setSearch(event.target.value);
            }}
            sx={{ background: 'white', borderRadius: 2 }}
          />
          <Button variant="contained" onClick={fetchTvSeries}>
            Search
          </Button>
        </Stack>
      </Paper>
      <Stack direction="column">
        {shows.map((item) => (
          <ShowItem key={item.id} show={item} />
        ))}
      </Stack>
    </>
  );
};

export default SearchPage;
