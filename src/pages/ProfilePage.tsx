import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

import { Link } from 'react-router-dom';

import { AvatarPicker } from '../components/profile/AvatarPicker';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { getButtonClassName } from '../components/ui/buttonClassName';
import { formatJoinDate, getInitials } from '../lib/format';
import { getAvatarOption, useProfileStore } from '../store/profileStore';
import type { AvatarId } from '../store/profileStore';

export function ProfilePage() {
  const avatarId = useProfileStore((state) => state.avatarId);
  const completeSetup = useProfileStore((state) => state.completeSetup);
  const joinDate = useProfileStore((state) => state.joinDate);
  const name = useProfileStore((state) => state.name);

  const [draftName, setDraftName] = useState(name);
  const [draftAvatarId, setDraftAvatarId] = useState<AvatarId>(avatarId);

  const selectedAvatar = getAvatarOption(draftAvatarId);
  const initials = getInitials(draftName);
  const isNameValid = draftName.trim().length >= 2;

  return (
    <section className="page page--centered">
      <header className="page-header page-header--centered">
        <Link className="page-header__back" to="/">
          <ArrowLeft size={16} />
          Back to dashboard
        </Link>
        <p className="page-header__eyebrow">Guest profile</p>
        <h1>Profile setup</h1>
        <p className="page-header__description">
          This profile stays local to the browser and personalizes the dashboard, sidebar, and resume flow.
        </p>
      </header>

      <div className="profile-layout">
        <Card className="profile-card profile-card--preview" accent>
          <p className="profile-card__eyebrow">Identity preview</p>
          <div className={['profile-card__avatar', selectedAvatar.tone].join(' ')}>{initials}</div>
          <h2>{draftName || 'Guest profile'}</h2>
          <p className="profile-card__meta">Joined {formatJoinDate(joinDate)}</p>
          <p className="profile-card__description">
            Milestone 0 keeps this intentionally light: name, avatar, and stable persistence keys.
          </p>
        </Card>

        <Card className="profile-card profile-card--form">
          <form
            className="profile-form"
            onSubmit={(event) => {
              event.preventDefault();

              if (!isNameValid) {
                return;
              }

              completeSetup({ avatarId: draftAvatarId, name: draftName.trim() });
            }}
          >
            <label className="field">
              <span className="field__label">Learner name</span>
              <input
                className="field__input"
                maxLength={32}
                onChange={(event) => setDraftName(event.target.value)}
                placeholder="Enter your call sign"
                value={draftName}
              />
            </label>

            <div className="field">
              <span className="field__label">Avatar style</span>
              <AvatarPicker displayName={draftName} onChange={setDraftAvatarId} selectedAvatarId={draftAvatarId} />
            </div>

            <div className="profile-form__footer">
              <p className="profile-form__hint">Stored under <code>nlh_profile</code> in localStorage.</p>
              <Button disabled={!isNameValid} fullWidth type="submit">
                Save profile
              </Button>
              <Link className={getButtonClassName({ variant: 'ghost' })} to="/">
                Return to dashboard
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </section>
  );
}
