import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import JoinBettingRoom from './JoinBettingRoom';

describe('JoinBettingRoom Component', () => {
  beforeEach(() => {
    render(<JoinBettingRoom />);
  });

  it('should render the join form with an input and a submit button', () => {
    expect(screen.getByLabelText('Room ID:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Join Room' })).toBeInTheDocument();
  });

  it('should allow entering a room ID', () => {
    const input = screen.getByLabelText('Room ID:');
    fireEvent.change(input, { target: { value: '12345' } });
    expect(input.value).toBe('12345');
  });

  it('should handle form submission', () => {
    // Mock the console.log to test if it's called correctly
    const consoleSpy = jest.spyOn(console, 'log');
    const input = screen.getByLabelText('Room ID:');
    const button = screen.getByRole('button', { name: 'Join Room' });

    // Simulate user typing in the room ID
    fireEvent.change(input, { target: { value: '12345' } });
    // Simulate user submitting the form
    fireEvent.click(button);

    expect(consoleSpy).toHaveBeenCalledWith('Joining room with ID:', '12345');
    // Clean up the mock to ensure tests are isolated
    consoleSpy.mockRestore();
  });

  it('should require room ID before submission', () => {
    const button = screen.getByRole('button', { name: 'Join Room' });
    fireEvent.click(button);
    expect(screen.getByText('Enter room ID')).toBeInTheDocument();
  });
});
