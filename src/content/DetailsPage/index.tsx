import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Markup } from 'interweave';
import { Box, Stack, Typography } from '@mui/material';

import { getShow } from '../../api/tvSeries';
import { Show } from '../../types/show';
import { stringWithoutHTML } from '../../helpers/strings';

import {
  ErrorAlert,
  LoadingContainer,
  Header,
  ImagePlaceholder,
} from '../../components';

type DetailsRouteParams = {
  seriesId: string;
};

const DetailsPage = () => {
  const { seriesId } = useParams<DetailsRouteParams>();
  const [show, setShow] = useState<Show | undefined>();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  const image = show?.image?.medium;
  const itemHasImage = image !== undefined;
  const itemHasSummary = show?.summary !== null;

  useEffect(() => {
    setIsLoading(true);
    getShow(seriesId)
      .then((result) => setShow(result))
      .catch((error) => {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage('An unknown error occurred');
        }
      })
      .finally(() => setIsLoading(false));
    return () => {};
  }, []);

  const hasError = errorMessage !== undefined && errorMessage !== '';

  return (
    <>
      <Header>
        <Stack
          sx={{ height: '100%' }}
          className="main-content"
          direction="column"
          justifyContent="center"
        >
          <Typography
            variant="h3"
            component="h3"
            sx={{ alignSelf: 'center', marginTop: 2, px: 2 }}
          >
            {show?.name}
          </Typography>
        </Stack>
      </Header>
      {isLoading && <LoadingContainer />}
      {!isLoading && (
        <Box className="main-content" sx={{ display: 'flex', margin: 2 }}>
          {hasError && (
            <ErrorAlert
              title={'Could not find tv serie'}
              message={errorMessage}
            />
          )}
          {!hasError && (
            <>
              {itemHasImage && (
                <img
                  src={show?.image?.medium}
                  alt={show?.name}
                  width="200"
                  style={{ objectFit: 'contain' }}
                />
              )}
              {!itemHasImage && <ImagePlaceholder />}
              <Box
                sx={{ display: 'flex', flexDirection: 'column', marginLeft: 2 }}
              >
                <div>
                  {itemHasSummary && (
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                      sx={{ height: '100%' }}
                    >
                      <Markup
                        content={stringWithoutHTML(
                          show?.summary ?? 'No description found'
                        )}
                      />
                    </Typography>
                  )}

                  {!itemHasSummary && (
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                      sx={{ height: '100%' }}
                    >
                      No description found
                    </Typography>
                  )}
                </div>

                <Box
                  sx={{
                    display: 'flex',
                    width: '100%',
                    marginTop: 2,
                    flexWrap: 'wrap',
                  }}
                >
                  <ShowDetails label="Language" value={show?.language} />
                  <ShowDetails label="Status" value={show?.status} />
                  <ShowDetails label="Started" value={show?.premiered} />
                  <ShowDetails label="Ended" value={show?.ended} />
                </Box>
              </Box>
            </>
          )}
        </Box>
      )}
    </>
  );
};

export default DetailsPage;

const ShowDetails = ({
  label,
  value,
}: {
  label: string;
  value: string | undefined | null;
}) => {
  if (value === undefined || value === null) {
    return <></>;
  }
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      component="div"
      sx={{ padding: 1 }}
    >
      <span style={{ fontWeight: 'bold' }}>{label}: </span>
      {value}
    </Typography>
  );
};
