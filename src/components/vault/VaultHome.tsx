import { useState } from 'react';
import { Bookmark, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

import { getVaultCategories, getVaultItemById, searchVaultItems } from '../../content/vault';
import { useVaultStore } from '../../store/vaultStore';

export function VaultHome() {
  const categories = getVaultCategories();
  const bookmarks = useVaultStore((state) => state.bookmarks);
  const [searchQuery, setSearchQuery] = useState('');

  const searchResults = searchQuery.length >= 2 ? searchVaultItems(searchQuery) : [];

  return (
    <section className="page page--centered" aria-label="Knowledge Vault">
      <header className="page-header page-header--centered">
        <p className="page-header__eyebrow">Permanent Reference Layer</p>
        <h1>The Vault</h1>
        <p className="page-header__description">
          Always-accessible reference material. Ports, protocols, CLI commands, protocol facts, and exam traps — searchable and bookmarkable.
        </p>
      </header>

      <div className="vault-search">
        <Search size={18} className="vault-search__icon" />
        <input
          type="text"
          className="vault-search__input"
          placeholder="Search across all vault content..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search vault content"
        />
      </div>

      {searchQuery.length >= 2 && searchResults.length > 0 && (
        <div className="vault-search-results">
          <h2 className="vault-search-results__title">{searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{searchQuery}"</h2>
          <div className="vault-search-results__list">
            {searchResults.map((item) => (
              <Link
                key={item.id}
                to={`/vault/${item.category}`}
                className="vault-search-result-card"
              >
                <span className="vault-search-result-card__category">{item.category}</span>
                <h3 className="vault-search-result-card__title">{item.title}</h3>
                <p className="vault-search-result-card__snippet">
                  {item.content.slice(0, 120)}...
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {searchQuery.length >= 2 && searchResults.length === 0 && (
        <div className="tab-placeholder">
          <h2 className="tab-placeholder__title">No results found</h2>
          <p className="tab-placeholder__description">
            No vault items match "{searchQuery}". Try a different search term.
          </p>
        </div>
      )}

      {bookmarks.length > 0 && (
        <div className="vault-bookmarks">
          <h2 className="vault-bookmarks__title">
            <Bookmark size={18} />
            Bookmarked Items ({bookmarks.length})
          </h2>
          <div className="vault-bookmarks__list">
            {bookmarks.map((bookmark) => {
              const item = getVaultItemById(bookmark.itemId);
              if (!item) return null;
              return (
                <Link
                  key={bookmark.itemId}
                  to={`/vault/${item.category}`}
                  className="vault-bookmark-card"
                >
                  <span className="vault-bookmark-card__category">{item.category}</span>
                  <h3 className="vault-bookmark-card__title">{item.title}</h3>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <div className="vault-category-grid">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/vault/${cat.id}`}
            className="vault-category-card"
          >
            <h2 className="vault-category-card__title">{cat.label}</h2>
            <p className="vault-category-card__description">{cat.description}</p>
            <span className="vault-category-card__arrow">Browse →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
