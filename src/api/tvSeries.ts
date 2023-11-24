import { SearchResponse, Show } from '../types/show';

export const getSearchResults = async (search: string): Promise<Show[]> => {
  try {
    const response = await fetch(
      ` https://api.tvmaze.com/search/shows?q=${search}`
    );
    const data: SearchResponse[] = await response.json();

    return data.map((show) => show.show);
  } catch (error) {
    console.error(error);
  }
  return [];
};

export const getShow = async (
  showId: string | undefined
): Promise<Show | undefined> => {
  if (showId != null) {
    try {
      const response = await fetch(`https://api.tvmaze.com/shows/${showId}`);
      const data: Show = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  return;
};
