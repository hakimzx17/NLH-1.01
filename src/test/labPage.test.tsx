import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { LabPage } from '../pages/LabPage';
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

function renderLabPage(initialEntry = '/lesson/d1-network-components/lab') {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route element={<LabPage />} path="/lesson/:id/lab" />
      </Routes>
    </MemoryRouter>,
  );
}

async function runCommands(commands: string[]): Promise<void> {
  const input = screen.getByLabelText(/ios command input/i);
  const runButton = screen.getByRole('button', { name: /run command/i });

  for (const command of commands) {
    fireEvent.change(input, { target: { value: command } });
    fireEvent.click(runButton);
  }
}

describe('LabPage', () => {
  it('shows the pending lab fallback for lessons without authored labs even on smaller viewports', () => {
    mockMatchMedia({
      '(min-width: 1024px)': false,
    });

    renderLabPage('/lesson/d2-stp/lab');

    expect(screen.getByRole('heading', { name: /lab platform ready, lesson scenario pending/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /practice lab requires a desktop browser/i })).not.toBeInTheDocument();
  });

  it('shows the desktop-only guard on smaller viewports', () => {
    mockMatchMedia({
      '(min-width: 1024px)': false,
    });

    renderLabPage();

    expect(screen.getByRole('heading', { name: /practice lab requires a desktop browser/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /return to lesson/i })).toBeInTheDocument();
  });

  it('marks the reference lab complete after the deterministic command sequence', async () => {
    mockMatchMedia({
      '(min-width: 1024px)': true,
    });

    useProgressStore.setState((state) => ({
      ...state,
      lessons: {
        ...state.lessons,
        'd1-network-components': {
          ...state.lessons['d1-network-components'],
          status: 'available',
          progressPercent: 0,
          labComplete: false,
          simViewed: false,
        },
      },
    }));

    renderLabPage();

    await runCommands([
      'enable',
      'conf t',
      'hostname EDGE',
      'int g0/0',
      'description LAN Gateway',
      'ip address 192.168.10.1 255.255.255.0',
      'no shut',
      'exit',
      'router ospf 1',
      'network 192.168.10.0 0.0.0.255 area 0',
    ]);

    await waitFor(() => {
      expect(screen.getByText(/3\/3 complete/i)).toBeInTheDocument();
      expect(useProgressStore.getState().lessons['d1-network-components'].labComplete).toBe(true);
    });

    fireEvent.click(screen.getByRole('button', { name: /sw1 l2 switch/i }));

    expect(useProgressStore.getState().lessons['d1-network-components'].progressPercent).toBe(60);
    expect(screen.getByRole('heading', { name: /lab completion saved to lesson progress/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /sw1 · l2 switch/i })).toBeInTheDocument();
  });
});
