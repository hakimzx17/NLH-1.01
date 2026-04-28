import { useEffect, useState } from 'react';

import { AvatarPicker } from './AvatarPicker';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { useProfileStore } from '../../store/profileStore';
import type { AvatarId } from '../../store/profileStore';

type ProfileSetupModalProps = {
  isOpen: boolean;
};

export function ProfileSetupModal({ isOpen }: ProfileSetupModalProps) {
  const completeSetup = useProfileStore((state) => state.completeSetup);
  const savedAvatarId = useProfileStore((state) => state.avatarId);
  const savedName = useProfileStore((state) => state.name);

  const [name, setName] = useState(savedName);
  const [avatarId, setAvatarId] = useState<AvatarId>(savedAvatarId);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setName(savedName);
    setAvatarId(savedAvatarId);
  }, [isOpen, savedAvatarId, savedName]);

  const trimmedName = name.trim();
  const isNameValid = trimmedName.length >= 2;

  return (
    <Modal
      description="Create a lightweight local profile so the dashboard can persist your name, avatar, and resume point."
      dismissible={false}
      isOpen={isOpen}
      title="Welcome to NetLearnHub"
    >
      <form
        className="profile-setup-form"
        onSubmit={(event) => {
          event.preventDefault();

          if (!isNameValid) {
            return;
          }

          completeSetup({ avatarId, name: trimmedName });
        }}
      >
        <label className="field">
          <span className="field__label">Learner name</span>
          <input
            autoFocus
            className="field__input"
            maxLength={32}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter your call sign"
            value={name}
          />
        </label>

        <div className="field">
          <span className="field__label">Pick an avatar</span>
          <AvatarPicker displayName={name} onChange={setAvatarId} selectedAvatarId={avatarId} />
        </div>

        <div className="profile-setup-form__footer">
          <p className="profile-setup-form__hint">Stored locally in this browser under your guest profile.</p>
          <Button disabled={!isNameValid} fullWidth type="submit">
            Enter mission control
          </Button>
        </div>
      </form>
    </Modal>
  );
}
