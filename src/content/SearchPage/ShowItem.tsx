import React from 'react';
import { Show } from '../../types/show';
import { Link } from 'react-router-dom';

interface ShowItem {
  show: Show;
}

const ShowItem = ({ show }: ShowItem) => {
  return (
    <div>
      <Link to={`/details/${show.id}`}>{show.name}</Link>
    </div>
  );
};

export default ShowItem;
