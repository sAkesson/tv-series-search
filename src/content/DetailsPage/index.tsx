import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Show } from '../../types/show';
import { getShow } from '../../api/tvSeries';
import { Box, Paper, Stack, Typography } from '@mui/material';
import { Markup } from 'interweave';
import { stringWithoutHTML } from '../../helpers/strings';
import LoadingContainer from '../../components/LoadingContainer';
import ErrorAlert from '../../components/Alerts';

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
          justifyContent="center"
        >
          <Typography
            variant="h3"
            component="h3"
            sx={{ alignSelf: 'center', marginTop: 2 }}
          >
            {show?.name}
          </Typography>
        </Stack>
      </Paper>
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
                  alt="Girl in a jacket"
                  width="200"
                  style={{ objectFit: 'contain' }}
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
                        content={stringWithoutHTML(show?.summary ?? '')}
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
  value: string | undefined;
}) => {
  if (value === undefined) {
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
