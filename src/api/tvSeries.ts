import { getErrorMessage } from '../helpers/errors';
import { SearchResponse, Show } from '../types/show';

export const getSearchResults = async (search: string): Promise<Show[]> => {
  try {
    const response = await fetch(
      ` https://api.tvmaze.com/search/shows?q=${search}`
    );

    if (!response.ok) {
      throw getErrorMessage(response.status);
    }

    const data: SearchResponse[] = await response.json();

    return data.map((show) => show.show);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

export const getShow = async (showId: string | undefined): Promise<Show> => {
  if (showId != null) {
    try {
      const response = await fetch(`https://api.tvmaze.com/shows/${showId}`);
      if (!response.ok) {
        throw getErrorMessage(response.status);
      }
      const data: Show = await response.json();

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }

  throw new Error('Could not find show id');
};
