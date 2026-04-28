import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { SimulationPage } from '../pages/SimulationPage';
import { useProgressStore } from '../store/progressStore';

type MatchMediaConfig = Record<string, boolean>;

function mockMatchMedia(config: MatchMediaConfig): void {
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: (query: string): MediaQueryList => ({
      matches: config[query] ?? false,
      media: query,
      onchange: null,
      addListener: () => undefined,
      removeListener: () => undefined,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      dispatchEvent: () => false,
    }),
  });
}

describe('SimulationPage', () => {
  it('shows the desktop-only guard on smaller viewports', () => {
    mockMatchMedia({
      '(min-width: 1024px)': false,
      '(prefers-reduced-motion: reduce)': false,
    });

    render(
      <MemoryRouter initialEntries={['/lesson/d1-network-components/simulation']}>
        <Routes>
          <Route element={<SimulationPage />} path="/lesson/:id/simulation" />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: /simulation requires a desktop browser/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /return to lesson/i })).toBeInTheDocument();
  });

  it('marks the simulation viewed after desktop interaction', () => {
    mockMatchMedia({
      '(min-width: 1024px)': true,
      '(prefers-reduced-motion: reduce)': false,
    });

    useProgressStore.setState((state) => ({
      ...state,
      lessons: {
        ...state.lessons,
        'd1-network-components': {
          ...state.lessons['d1-network-components'],
          simViewed: false,
          labComplete: false,
          progressPercent: 0,
          status: 'available',
        },
      },
    }));

    render(
      <MemoryRouter initialEntries={['/lesson/d1-network-components/simulation']}>
        <Routes>
          <Route element={<SimulationPage />} path="/lesson/:id/simulation" />
        </Routes>
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole('button', { name: /^step$/i }));

    expect(screen.getByRole('heading', { name: /switch forwards within the lan/i })).toBeInTheDocument();
    expect(useProgressStore.getState().lessons['d1-network-components'].simViewed).toBe(true);
    expect(useProgressStore.getState().lessons['d1-network-components'].progressPercent).toBe(45);
    expect(screen.getByRole('status')).toHaveTextContent(/step 2 of 4/i);
  });

  it('blocks locked lessons from earning simulation progress', () => {
    mockMatchMedia({
      '(min-width: 1024px)': true,
      '(prefers-reduced-motion: reduce)': false,
    });

    useProgressStore.setState((state) => ({
      ...state,
      lessons: {
        ...state.lessons,
        'd2-etherchannel': {
          ...state.lessons['d2-etherchannel'],
          status: 'locked',
          simViewed: false,
          progressPercent: 0,
        },
      },
    }));

    render(
      <MemoryRouter initialEntries={['/lesson/d2-etherchannel/simulation']}>
        <Routes>
          <Route element={<SimulationPage />} path="/lesson/:id/simulation" />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: /simulation locked/i })).toBeInTheDocument();
    expect(useProgressStore.getState().lessons['d2-etherchannel'].simViewed).toBe(false);
    expect(useProgressStore.getState().lessons['d2-etherchannel'].progressPercent).toBe(0);
  });
});
