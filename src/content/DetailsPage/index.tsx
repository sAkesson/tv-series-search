import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Show } from '../../types/show';
import { getShow } from '../../api/tvSeries';

type DetailsRouteParams = {
  seriesId: string;
};

const DetailsPage = () => {
  const { seriesId } = useParams<DetailsRouteParams>();
  const [show, setShow] = useState<Show | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getShow(seriesId)
      .then((result) => setShow(result))
      .finally(() => setIsLoading(false));
    return () => {};
  }, []);

  return <div>{show?.summary}</div>;
};

export default DetailsPage;
