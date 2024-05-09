import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

describe('App Routing', () => {
  const setup = (path) => {
    window.history.pushState({}, '', path);
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  };

  it('renders Home component on root path', () => {
    setup('/');
    expect(screen.getByText('Available Betting Rooms')).toBeInTheDocument();
  });

  it('renders JoinBettingRoom component on /join-room path', () => {
    setup('/join-room');
    expect(screen.getByText('Join a Betting Room')).toBeInTheDocument();
    expect(screen.getByLabelText('Room ID:')).toBeInTheDocument();
  });

  it('renders CreateBettingRoom component on /create-room path', () => {
    setup('/create-room');
    expect(screen.getByText('Create a Betting Room')).toBeInTheDocument();
  });

  it('renders Landing component on /signin path', () => {
    setup('/signin');
    expect(screen.getByText('Welcome to the Betting Room')).toBeInTheDocument();
  });

  it('navigates to the sign-in page when Sign In / Sign Up is clicked', () => {
    setup('/');
    userEvent.click(screen.getByText('Sign In / Sign Up'));
    expect(screen.getByText('Welcome to the Betting Room')).toBeInTheDocument();
  });

  it('navigates to the home page when Home is clicked', () => {
    setup('/signin');
    userEvent.click(screen.getByText('Home'));
    expect(screen.getByText('Available Betting Rooms')).toBeInTheDocument();
  });
});
