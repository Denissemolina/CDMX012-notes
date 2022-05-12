import { render, screen } from '@testing-library/react';
import Login from './Login';
import AuthProvider from '../context/authContext';

// eslint-disable-next-line no-unused-expressions
describe('Usuario disponible', () => {
  it('Verificar si hay usuario', () => {
    render(<Login />);
  });

  screen.debug();
  expect(screen.getByText('No hay usuario')).toBeInTheDocument();
});
