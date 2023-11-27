import { rest } from 'msw';
import SearchResponse from './mocks/SearchResponse.json';
import ShowWithData from './mocks/ShowWithData.json';
import ShowWithoutData from './mocks/ShowWithoutData.json';
import { BASE_URL, SEARCH_SHOWS, GET_SHOW } from '../configs/urls';

/* ------ URLS ------ */
export const SEARCH_SHOWS_URL = `${BASE_URL}${SEARCH_SHOWS}`;
export const GET_SHOW_URL = `${BASE_URL}${GET_SHOW}:seriesId`;

/* ------ Handlers ------ */
export const handlers = [
  rest.get(SEARCH_SHOWS_URL, (req, res, ctx) => {
    return res(ctx.json(SearchResponse.response));
  }),
  rest.get(GET_SHOW_URL, (req, res, ctx) => {
    if (req.params.seriesId === '2') {
      console.log('in here');
      return res(ctx.json(ShowWithoutData));
    }

    return res(ctx.json(ShowWithData));
  }),
];
