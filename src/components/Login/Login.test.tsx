import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from './Login';

describe('<Login />', () => {
  test('it should mount', () => {
    render(<Login onLogin={function (email: string, password: string): void {
      throw new Error('Function not implemented.');
    } } />)
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
    
    const login = screen.getByTestId('Login');

    expect(login).toBeInTheDocument();
  });
});