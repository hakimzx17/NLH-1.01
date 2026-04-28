import { getInitials } from '../../lib/format';
import { avatarOptions } from '../../store/profileStore';
import type { AvatarId } from '../../store/profileStore';

type AvatarPickerProps = {
  displayName: string;
  selectedAvatarId: AvatarId;
  onChange: (avatarId: AvatarId) => void;
};

export function AvatarPicker({ displayName, selectedAvatarId, onChange }: AvatarPickerProps) {
  const initials = getInitials(displayName);

  return (
    <div className="avatar-picker" role="radiogroup" aria-label="Avatar picker">
      {avatarOptions.map((avatar) => {
        const isSelected = avatar.id === selectedAvatarId;

        return (
          <button
            aria-checked={isSelected}
            aria-label={`Avatar style: ${avatar.label}`}
            className={[
              'avatar-option',
              avatar.tone,
              isSelected ? 'avatar-option--selected' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            key={avatar.id}
            onClick={() => onChange(avatar.id)}
            role="radio"
            type="button"
          >
            <span className="avatar-option__monogram">{initials}</span>
            <span className="avatar-option__label">{avatar.label}</span>
          </button>
        );
      })}
    </div>
  );
}
