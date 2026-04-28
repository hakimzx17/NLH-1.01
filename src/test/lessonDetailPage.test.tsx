import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { LessonDetailPage } from '../pages/LessonDetailPage';

describe('LessonDetailPage', () => {
  it('blocks direct navigation to locked lessons', () => {
    render(
      <MemoryRouter initialEntries={['/lesson/d3-routing-concepts']}>
        <Routes>
          <Route element={<LessonDetailPage />} path="/lesson/:id" />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: /how routers make forwarding decisions is still locked/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /back to domains/i })).toHaveAttribute('href', '/domains');
  });
});
