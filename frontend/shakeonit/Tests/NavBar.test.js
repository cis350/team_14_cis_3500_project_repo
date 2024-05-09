import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from './Navbar';

describe('Navbar Component', () => {
  const setup = (isLoggedIn = false) => {
    Storage.prototype.getItem = jest.fn(() => isLoggedIn ? 'user@example.com' : null);
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
  };

  it('renders Navbar with sign in link when not logged in', () => {
    setup(false);
    expect(screen.getByText('Sign In / Sign Up')).toBeInTheDocument();
    expect(screen.queryByText('Welcome,')).not.toBeInTheDocument();
    expect(screen.queryByText('Sign Out')).not.toBeInTheDocument();
  });

  it('renders Navbar with user email and sign out link when logged in', () => {
    setup(true);
    expect(screen.getByText('Welcome, user@example.com')).toBeInTheDocument();
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
    expect(screen.queryByText('Sign In / Sign Up')).not.toBeInTheDocument();
  });

  it('allows user to sign out', () => {
    setup(true);
    Storage.prototype.removeItem = jest.fn();
    fireEvent.click(screen.getByText('Sign Out'));
    expect(localStorage.removeItem).toHaveBeenCalledWith('userEmail');
    expect(screen.getByText('Sign In / Sign Up')).toBeInTheDocument();
    expect(screen.queryByText('Welcome, user@example.com')).not.toBeInTheDocument();
    expect(screen.queryByText('Sign Out')).not.toBeInTheDocument();
  });

  it('displays correct navigation links', () => {
    setup();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Join Room')).toBeInTheDocument();
    expect(screen.getByText('Create Room')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Join Room' })).toHaveAttribute('href', '/join-room');
    expect(screen.getByRole('link', { name: 'Create Room' })).toHaveAttribute('href', '/create-room');
  });
});
