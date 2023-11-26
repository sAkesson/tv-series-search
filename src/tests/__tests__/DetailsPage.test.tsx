import React from 'react';
import { rest } from 'msw';
import DetailsPage from '../../content/DetailsPage/index';
import { setupServer } from 'msw/node';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
  findByText,
} from '@testing-library/react';

import { GET_SHOW_URL, handlers } from '../config';

const server = setupServer(...handlers);

describe('SearchPage flow', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('It searches for show', async () => {
    render(
      <MemoryRouter initialEntries={[`/details/${123}`]}>
        <Routes>
          <Route path="/details/:seriesId" element={<DetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitForElementToBeRemoved(() =>
      screen.getByTestId('loading-container')
    );

    const driverInStart = screen.getByText(/Test tv series title/i);
    expect(driverInStart).toBeInTheDocument();
  });

  test('It handles 404 errors', async () => {
    server.use(
      rest.get(GET_SHOW_URL, (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );

    render(
      <MemoryRouter initialEntries={[`/details/${123}`]}>
        <Routes>
          <Route path="/details/:seriesId" element={<DetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitForElementToBeRemoved(() =>
      screen.getByTestId('loading-container')
    );

    const errorText = screen.getByText(
      /We couldn't find the show you're looking for./i
    );
    expect(errorText).toBeInTheDocument();
  });

  test('It handles 500 errors', async () => {
    server.use(
      rest.get(GET_SHOW_URL, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(
      <MemoryRouter initialEntries={[`/details/${123}`]}>
        <Routes>
          <Route path="/details/:seriesId" element={<DetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitForElementToBeRemoved(() =>
      screen.getByTestId('loading-container')
    );

    const errorText = screen.getByText(
      /There's a problem with our server. Please try again later./i
    );
    expect(errorText).toBeInTheDocument();
  });

  test('It handles 408 errors', async () => {
    server.use(
      rest.get(GET_SHOW_URL, (req, res, ctx) => {
        return res(ctx.status(408));
      })
    );

    render(
      <MemoryRouter initialEntries={[`/details/${123}`]}>
        <Routes>
          <Route path="/details/:seriesId" element={<DetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitForElementToBeRemoved(() =>
      screen.getByTestId('loading-container')
    );

    const errorText = screen.getByText(
      /The request timed out. Please check your connection and try again./i
    );
    expect(errorText).toBeInTheDocument();
  });
});
