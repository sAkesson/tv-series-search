import React from 'react';
import { Markup } from 'interweave';
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
import { Show } from '../../types/show';

import { ImagePlaceholder } from '../../components';

import './style.css';

interface SeriesListingCardProps {
  show: Show;
}

const SeriesListingCard = ({ show }: SeriesListingCardProps) => {
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
            alt={show.name}
          />
        )}

        {!itemHasImage && <ImagePlaceholder />}

        <Box className="series-listing-card-text-content">
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
          <Box className="series-listing-card-actions">
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

export default SeriesListingCard;
