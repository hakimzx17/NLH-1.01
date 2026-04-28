import '@testing-library/jest-dom/vitest';
import { beforeEach } from 'vitest';

import { createDefaultProfileState, useProfileStore } from '../store/profileStore';
import { createDefaultProgressState, useProgressStore } from '../store/progressStore';

beforeEach(() => {
  localStorage.clear();
  useProfileStore.setState(createDefaultProfileState());
  useProgressStore.setState(createDefaultProgressState());
});
