import { render, screen } from '@testing-library/react';
import Header from './Header';

// eslint-disable-next-line no-undef
describe('Header component', () => {
  // eslint-disable-next-line no-undef
  it('render the content', () => {
    render(<Header />);
    screen.debug();
  });
});
