import { BASE_URL, GET_SHOW, SEARCH_SHOWS } from '../configs/urls';
import { getErrorMessage } from '../helpers/errors';
import { SearchResponse, Show } from '../types/show';

export const getSearchResults = async (search: string): Promise<Show[]> => {
  const sessionStorageKey = `search-${search}`;

  const cachedData = sessionStorage.getItem(sessionStorageKey);
  if (cachedData !== null) {
    return JSON.parse(cachedData);
  }

  try {
    const response = await fetch(`${BASE_URL}${SEARCH_SHOWS}?q=${search}`);

    if (!response.ok) {
      throw getErrorMessage(response.status);
    }

    const data: SearchResponse[] = await response.json();
    const shows = data.map((show) => show.show);

    sessionStorage.setItem(sessionStorageKey, JSON.stringify(shows));
    return shows;
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
    const sessionStorageKey = `show-${showId}`;

    const cachedData = sessionStorage.getItem(sessionStorageKey);
    if (cachedData !== null) {
      return JSON.parse(cachedData);
    }
    try {
      const response = await fetch(`${BASE_URL}${GET_SHOW}${showId}`);
      if (!response.ok) {
        throw getErrorMessage(response.status);
      }
      const data: Show = await response.json();
      sessionStorage.setItem(sessionStorageKey, JSON.stringify(data));

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
