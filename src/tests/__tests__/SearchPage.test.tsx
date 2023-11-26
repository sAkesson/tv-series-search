import React from 'react';
import { rest } from 'msw';
import SearchPage from '../../content/SearchPage/index';
import { setupServer } from 'msw/node';
import { BrowserRouter } from 'react-router-dom';
import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import { SEARCH_SHOWS_URL, handlers } from '../config';

const server = setupServer(...handlers);

describe('SearchPage flow', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('It searches for show', async () => {
    render(
      <BrowserRouter>
        <SearchPage />
      </BrowserRouter>
    );

    const searchButton = screen.getByTestId('search-button');
    fireEvent.click(searchButton);

    await waitForElementToBeRemoved(() =>
      screen.getByTestId('loading-container')
    );

    const cardTitle = screen.getByText(/Test tv series title/i);
    expect(cardTitle).toBeInTheDocument();
  });

  test('It displays proper data', async () => {
    const { container } = render(
      <BrowserRouter>
        <SearchPage />
      </BrowserRouter>
    );

    const searchButton = screen.getByTestId('search-button');
    fireEvent.click(searchButton);

    await waitForElementToBeRemoved(() =>
      screen.getByTestId('loading-container')
    );

    const gameCardImage = container
      .getElementsByClassName('MuiCardMedia-root')
      .item(0);
    const gameCardDescription = screen.getByText(
      /Here is a summarty of the tv series/i
    );
    expect(gameCardImage).toBeInTheDocument();
    expect(gameCardDescription).toBeInTheDocument();
  });

  test('It handles 404 errors', async () => {
    server.use(
      rest.get(SEARCH_SHOWS_URL, (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );

    render(
      <BrowserRouter>
        <SearchPage />
      </BrowserRouter>
    );

    const searchButton = screen.getByTestId('search-button');
    fireEvent.click(searchButton);

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
      rest.get(SEARCH_SHOWS_URL, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(
      <BrowserRouter>
        <SearchPage />
      </BrowserRouter>
    );

    const searchButton = screen.getByTestId('search-button');
    fireEvent.click(searchButton);

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
      rest.get(SEARCH_SHOWS_URL, (req, res, ctx) => {
        return res(ctx.status(408));
      })
    );

    render(
      <BrowserRouter>
        <SearchPage />
      </BrowserRouter>
    );

    const searchButton = screen.getByTestId('search-button');
    fireEvent.click(searchButton);

    await waitForElementToBeRemoved(() =>
      screen.getByTestId('loading-container')
    );

    const errorText = screen.getByText(
      /The request timed out. Please check your connection and try again./i
    );
    expect(errorText).toBeInTheDocument();
  });
});
