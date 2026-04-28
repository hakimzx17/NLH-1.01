import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { ProfileSetupModal } from '../components/profile/ProfileSetupModal';
import { DashboardPage } from '../pages/DashboardPage';
import { useProfileStore } from '../store/profileStore';

describe('DashboardPage', () => {
  it('renders persisted progress widgets and resume action', () => {
    useProfileStore.setState({ hasCompletedSetup: true, name: 'Jordan Vale' });

    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('Study Time')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /ccna progress/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /resume lesson/i })).toBeInTheDocument();
    expect(screen.getByText('24h 15m')).toBeInTheDocument();
  });
});

describe('ProfileSetupModal', () => {
  it('enables submission once a valid name is entered', () => {
    render(<ProfileSetupModal isOpen />);

    const submitButton = screen.getByRole('button', { name: /enter mission control/i });

    expect(submitButton).toBeDisabled();

    fireEvent.change(screen.getByPlaceholderText(/enter your call sign/i), {
      target: { value: 'Nadia' },
    });

    expect(submitButton).toBeEnabled();
  });
});
