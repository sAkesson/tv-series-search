import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
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
          height: 170,
          backgroundColor: '#142433',
          color: '#fff',
        }}
      >
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
            <Button variant="contained" onClick={fetchTvSeries}>
              Search
            </Button>
          </Stack>
        </Stack>
      </Paper>
      <Box className="main-content" sx={{ width: '100vw', marginTop: 2 }}>
        <Grid container spacing={2} justifyContent="center">
          {shows.map((item) => (
            <Grid item key={item.id}>
              <ShowItem show={item} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default SearchPage;
