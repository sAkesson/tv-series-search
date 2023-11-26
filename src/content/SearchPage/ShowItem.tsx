import React from 'react';
import { Markup } from 'interweave';
import { Show } from '../../types/show';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { shortenString, stringWithoutHTML } from '../../helpers/strings';
import './style.css';

interface ShowItem {
  show: Show;
}

const ShowItem = ({ show }: ShowItem) => {
  const navigate = useNavigate();
  const image = show?.image?.medium;
  const itemHasImage = image !== undefined;
  const itemHasSummary = show.summary !== null;

  return (
    <Card className="series-listing-card">
      <CardContent sx={{ display: 'flex' }}>
        {itemHasImage && (
          <CardMedia
            component="img"
            sx={{ width: 120 }}
            image={image}
            alt="Live from space album cover"
          />
        )}

        {!itemHasImage && (
          <Box
            sx={{
              flex: '1 0 auto',
              backgroundColor: 'gray',
              display: 'flex',
              width: '120px',
              maxWidth: '120px',
              height: '168px',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
            }}
          >
            No Image
          </Box>
        )}

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            paddingLeft: 2,
            width: '100%',
            alignItems: 'stretch',
          }}
        >
          <Typography component="div" variant="h5">
            {show.name}
          </Typography>
          {itemHasSummary && (
            <Typography
              variant="body2"
              color="text.secondary"
              component="div"
              sx={{ height: '100%' }}
            >
              <Markup
                content={shortenString(stringWithoutHTML(show.summary))}
              />
            </Typography>
          )}
          {!itemHasSummary && (
            <Typography
              variant="body2"
              color="text.secondary"
              component="div"
              sx={{ height: '100%' }}
            >
              No description found
            </Typography>
          )}
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
            <Button
              variant="outlined"
              size="small"
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate(`/details/${show.id}`)}
            >
              See details
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ShowItem;
