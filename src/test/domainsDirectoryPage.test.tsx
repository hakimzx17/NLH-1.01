import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { DomainsDirectoryPage } from '../pages/DomainsDirectoryPage';

describe('DomainsDirectoryPage', () => {
  it('locks later domains until the previous domain is complete', () => {
    render(
      <MemoryRouter>
        <DomainsDirectoryPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: /domains directory/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /locked until domain 2/i })).toBeDisabled();
    expect(screen.getByText(/complete network access to unlock this domain path/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /resume/i })).toHaveAttribute('href', '/lesson/d2-stp');
  });
});
