import React from 'react';
import { rest } from 'msw';
import DetailsPage from '../../content/DetailsPage/index';
import { setupServer } from 'msw/node';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import { GET_SHOW_URL, handlers } from '../config';

const server = setupServer(...handlers);

describe('DetailsPage flow', () => {
  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
    sessionStorage.clear();
  });
  afterAll(() => server.close());

  test('It displays show with image and description', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={[`/details/${1}`]}>
        <Routes>
          <Route path="/details/:seriesId" element={<DetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitForElementToBeRemoved(() =>
      screen.getByTestId('loading-container')
    );

    const description = screen.getByText(
      /Here is a summarty of the tv series/i
    );
    const image = container.querySelector('img');
    expect(description).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });

  test('It displays show with placeholder for image and description', async () => {
    const showWithoutData = 2;
    render(
      <MemoryRouter initialEntries={[`/details/${showWithoutData}`]}>
        <Routes>
          <Route path="/details/:seriesId" element={<DetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitForElementToBeRemoved(() =>
      screen.getByTestId('loading-container')
    );

    const description = screen.getByText(/No description found/i);
    const imagePlaceholder = screen.getByText(/No Image/i);
    expect(description).toBeInTheDocument();
    expect(imagePlaceholder).toBeInTheDocument();
  });

  test('It handles when no show id is provided', async () => {
    render(
      <MemoryRouter initialEntries={[`/details/`]}>
        <Routes>
          <Route path="/details/" element={<DetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitForElementToBeRemoved(() =>
      screen.getByTestId('loading-container')
    );

    const errorText = screen.getByText(/Could not find show id/i);
    expect(errorText).toBeInTheDocument();
  });

  test('It handles 404 errors', async () => {
    server.use(
      rest.get(GET_SHOW_URL, (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );

    render(
      <MemoryRouter initialEntries={[`/details/${1}`]}>
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
      <MemoryRouter initialEntries={[`/details/${1}`]}>
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
      <MemoryRouter initialEntries={[`/details/${1}`]}>
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
