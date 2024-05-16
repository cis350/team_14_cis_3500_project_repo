import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Home from './Home';

// Set up fetch mock
beforeAll(() => {
  global.fetch = require('jest-fetch-mock');
  fetchMock.enableMocks();
});

afterEach(() => {
  fetchMock.resetMocks();
});

describe('Home Component', () => {
  it('displays loading message when fetching rooms', () => {
    fetch.mockResponseOnce(JSON.stringify([]));  // Immediately resolve with empty array
    render(<Home />);
    expect(screen.getByText('Loading rooms...')).toBeInTheDocument();
  });

  it('displays rooms when fetch is successful', async () => {
    const rooms = [
      { id: 1, name: 'Room 1', description: 'This is room 1' },
      { id: 2, name: 'Room 2', description: 'This is room 2' }
    ];
    fetch.mockResponseOnce(JSON.stringify(rooms));
    render(<Home />);
    await waitFor(() => {
      expect(screen.getByText('Room 1')).toBeInTheDocument();
      expect(screen.getByText('This is room 1')).toBeInTheDocument();
      expect(screen.getByText('Room 2')).toBeInTheDocument();
      expect(screen.getByText('This is room 2')).toBeInTheDocument();
    });
  });

  it('displays an error message if the fetch fails', async () => {
    fetch.mockReject(new Error('API failure'));
    render(<Home />);
    await waitFor(() => {
      expect(screen.getByText('Failed to fetch rooms:')).toBeInTheDocument();
    });
  });

  it('displays no rooms available message if no rooms are fetched', async () => {
    fetch.mockResponseOnce(JSON.stringify([]));  // Resolve with empty array
    render(<Home />);
    await waitFor(() => {
      expect(screen.getByText('No rooms available at the moment.')).toBeInTheDocument();
    });
  });
});
