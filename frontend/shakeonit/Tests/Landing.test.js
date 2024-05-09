import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Landing from './Landing';

// Mock fetch globally
global.fetch = require('jest-fetch-mock');

describe('Landing Component', () => {
  beforeEach(() => {
    fetch.resetMocks();
    render(<Landing />);
  });

  it('allows switching between login and signup forms', () => {
    expect(screen.getByText('Login')).toBeInTheDocument();
    userEvent.click(screen.getByText('Need an account? Sign Up'));
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
    userEvent.click(screen.getByText('Already have an account? Login'));
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('submits login form and handles response', async () => {
    fetch.mockResponseOnce(JSON.stringify({ message: 'Login successful' }));

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => expect(fetch).toHaveBeenCalledWith(
      'http://localhost:8002/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: 'user@example.com', password: 'password123' })
      }
    ));

    expect(localStorage.getItem('userEmail')).toBe('user@example.com');
  });

  it('submits signup form and handles response', async () => {
    userEvent.click(screen.getByText('Need an account? Sign Up'));

    fetch.mockResponseOnce(JSON.stringify({ message: 'Signup successful' }), { status: 201 });

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'newUser' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'newuser@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'newPassword123' } });
    fireEvent.click(screen.getByText('Sign Up'));

    await waitFor(() => expect(fetch).toHaveBeenCalledWith(
      'http://localhost:8002/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: 'newUser', email: 'newuser@example.com', password: 'newPassword123' })
      }
    ));

    expect(screen.getByText('Signup successful:', { exact: false })).toBeInTheDocument();
  });

  it('handles login and signup errors', async () => {
    fetch.mockReject(new Error('Failed to connect'));

    // Test login error
    fireEvent.click(screen.getByText('Login'));
    await waitFor(() => expect(screen.getByText('Login error:', { exact: false })).toBeInTheDocument());

    // Test signup error
    userEvent.click(screen.getByText('Need an account? Sign Up'));
    fireEvent.click(screen.getByText('Sign Up'));
    await waitFor(() => expect(screen.getByText('Signup error:', { exact: false })).toBeInTheDocument());
  });
});
