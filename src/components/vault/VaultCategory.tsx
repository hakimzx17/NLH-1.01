import { useState } from 'react';
import { Bookmark, Link as LinkIcon } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import { getLessonById } from '../../content/lessons';
import { getVaultCategoryById, getVaultItemsByCategory } from '../../content/vault';
import { useVaultStore } from '../../store/vaultStore';

export function VaultCategory() {
  const { category = '' } = useParams<{ category: string }>();
  const cat = getVaultCategoryById(category);
  const items = getVaultItemsByCategory(category as Parameters<typeof getVaultItemsByCategory>[0]);
  const bookmarkItem = useVaultStore((state) => state.bookmarkItem);
  const unbookmarkItem = useVaultStore((state) => state.unbookmarkItem);
  const isBookmarked = useVaultStore((state) => state.isBookmarked);

  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!cat) {
    return (
      <section className="page page--narrow">
        <header className="page-header">
          <p className="page-header__eyebrow">Category not found</p>
          <h1>Category Not Found</h1>
          <p className="page-header__description">
            The vault category you are looking for does not exist.
          </p>
          <Link className="button button--primary" to="/vault">Back to Vault</Link>
        </header>
      </section>
    );
  }

  return (
    <section className="page page--centered" aria-label={`Vault: ${cat.label}`}>
      <header className="page-header page-header--split">
        <div>
          <Link to="/vault" className="page-header__back">
            ← Back to Vault
          </Link>
          <p className="page-header__eyebrow">Vault Reference</p>
          <h1>{cat.label}</h1>
          <p className="page-header__description">{cat.description}</p>
        </div>
        <span className="vault-category__count">{items.length} item{items.length !== 1 ? 's' : ''}</span>
      </header>

      {items.length === 0 ? (
        <div className="tab-placeholder">
          <h2 className="tab-placeholder__title">No items yet</h2>
          <p className="tab-placeholder__description">
            This vault category is being populated. Check back soon.
          </p>
        </div>
      ) : (
        <div className="vault-items-list">
          {items.map((item) => {
            const isExpanded = expandedId === item.id;
            const bookmarked = isBookmarked(item.id);
            const relatedLessonExists = item.relatedLessonId
              ? Boolean(getLessonById(item.relatedLessonId))
              : false;

            return (
              <div key={item.id} className="vault-item-card">
                <div className="vault-item-card__header">
                  <button
                    type="button"
                    className="vault-item-card__toggle"
                    onClick={() => setExpandedId(isExpanded ? null : item.id)}
                    aria-expanded={isExpanded}
                    aria-controls={`vault-item-${item.id}`}
                  >
                    <h2 className="vault-item-card__title">{item.title}</h2>
                  </button>
                  <div className="vault-item-card__meta">
                    {item.relatedLessonId && relatedLessonExists && (
                      <Link
                        to={`/lesson/${item.relatedLessonId}`}
                        className="vault-item-card__lesson-link"
                      >
                        <LinkIcon size={14} />
                        Related lesson
                      </Link>
                    )}
                    <button
                      type="button"
                      className={`vault-item-card__bookmark ${bookmarked ? 'vault-item-card__bookmark--active' : ''}`}
                      onClick={() => {
                        if (bookmarked) {
                          unbookmarkItem(item.id);
                        } else {
                          bookmarkItem(item.id);
                        }
                      }}
                      aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark this item'}
                    >
                      <Bookmark size={16} />
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div id={`vault-item-${item.id}`} className="vault-item-card__content">
                    <pre className="vault-item-card__text">{item.content}</pre>
                    {item.tags.length > 0 && (
                      <div className="vault-item-card__tags">
                        {item.tags.map((tag) => (
                          <span key={tag} className="vault-item-card__tag">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
