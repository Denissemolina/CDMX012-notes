/* global describe, it, expect */

import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Login from './Login';
import { AuthProvider } from '../context/authContext';

// eslint-disable-next-line no-unused-expressions
describe('Usuario disponible', () => {
  it('Verificar si hay usuario', () => {
    // Extraido de aqui
    // https://testing-library.com/docs/example-react-router/
    // para evitar error
    // `useNavigate() may be used only in the context of a <Router> component.`
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </Router>,
    );
    expect(screen.getByText('No hay usuario')).toBeInTheDocument();
  });
});
