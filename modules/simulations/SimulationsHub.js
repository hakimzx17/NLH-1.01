/**
 * SimulationsHub.js — The Grind: Simulation Practice Center
 * Premium redesigned hub for browsing, filtering, and launching
 * all available simulations across CCNA domains.
 */

import { stateManager } from '../../js/stateManager.js';
import { progressEngine } from '../../js/progressEngine.js';
import { getAllSimulations, SIMULATION_ROUTE_MAP, ALL_PATHS } from '../../data/pathRegistry.js';
import { renderTokenIcon } from '../../utils/tokenIcons.js';

class SimulationsHub {
  constructor() {
    this.container = null;
    this._activeFilter = 'all';
    this._searchQuery = '';
    this._viewMode = 'grid'; // 'grid' | 'list'
    this._handlers = {};
  }

  init(containerEl) {
    this.container = containerEl;
    this._render();
    this._bindEvents();
  }

  /* ════════════════════════════════════════
     RENDER
     ════════════════════════════════════════ */

  _render() {
    const sims = getAllSimulations();
    const progress = stateManager.getState('userProgress');
    const completed = new Set(progress.completedModules || []);

    // Build stats
    const totalSims = sims.length;
    const implementedSims = sims.filter(s => s.implemented).length;
    const completedSims = sims.filter(s => completed.has(s.moduleId)).length;
    const completionPct = totalSims > 0 ? Math.round((completedSims / totalSims) * 100) : 0;

    // Unique domain categories
    const domains = [...new Set(sims.map(s => s.pathName))];
    // Map domain names to their colors
    const domainColorMap = {};
    sims.forEach(s => { domainColorMap[s.pathName] = s.pathColor; });

    // Group by difficulty
    const difficultyLabels = { 1: 'Beginner', 2: 'Intermediate', 3: 'Advanced' };

    this.container.innerHTML = `
      <div class="grind-hub" id="grind-hub">
        <!-- ─── Hero Section ─── -->
        <div class="grind-hero">
          <div class="grind-hero__glow"></div>
          <div class="grind-hero__content">
            <div class="grind-hero__text">
              <div class="grind-hero__kicker">
                ${renderTokenIcon('LAB', 'grind-hero__kicker-icon')}
                <span>Simulation Practice Center</span>
              </div>
              <h1 class="grind-hero__title">The <span class="grind-hero__accent">Grind</span></h1>
              <p class="grind-hero__subtitle">
                Sharpen your skills with hands-on labs and interactive simulations.
                Master networking concepts through practice, not just theory.
              </p>
            </div>
            <div class="grind-hero__stats">
              <div class="grind-stat" style="--stat-delay: 0">
                <div class="grind-stat__ring">
                  <svg viewBox="0 0 80 80" class="grind-stat__svg">
                    <circle cx="40" cy="40" r="34" class="grind-stat__track"/>
                    <circle cx="40" cy="40" r="34" class="grind-stat__fill" 
                            style="--pct: ${completionPct}"/>
                  </svg>
                  <span class="grind-stat__value">${completionPct}<small>%</small></span>
                </div>
                <span class="grind-stat__label">Complete</span>
              </div>
              <div class="grind-stat" style="--stat-delay: 1">
                <div class="grind-stat__number">${completedSims}<small>/${totalSims}</small></div>
                <span class="grind-stat__label">Labs Done</span>
              </div>
              <div class="grind-stat" style="--stat-delay: 2">
                <div class="grind-stat__number">${implementedSims}</div>
                <span class="grind-stat__label">Live Labs</span>
              </div>
            </div>
          </div>
          <!-- XP Progress bar -->
          <div class="grind-hero__xp">
            <div class="grind-hero__xp-track">
              <div class="grind-hero__xp-fill" style="width: ${completionPct}%"></div>
            </div>
            <div class="grind-hero__xp-labels">
              <span>${completedSims} completed</span>
              <span>${totalSims - completedSims} remaining</span>
            </div>
          </div>
        </div>

        <!-- ─── Toolbar ─── -->
        <div class="grind-toolbar">
          <div class="grind-toolbar__search">
            <svg class="grind-toolbar__search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input type="text" class="grind-toolbar__input" id="grind-search" placeholder="Search simulations…" autocomplete="off"/>
          </div>
          <div class="grind-toolbar__actions">
            <button class="grind-view-btn ${this._viewMode === 'grid' ? 'is-active' : ''}" data-view="grid" title="Grid view" id="grind-view-grid">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            </button>
            <button class="grind-view-btn ${this._viewMode === 'list' ? 'is-active' : ''}" data-view="list" title="List view" id="grind-view-list">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>
            </button>
          </div>
        </div>

        <!-- ─── Filter Tabs ─── -->
        <div class="grind-filters" id="grind-filters">
          <button class="grind-filter ${this._activeFilter === 'all' ? 'is-active' : ''}" data-filter="all">
            <span class="grind-filter__dot" style="background: var(--color-cyan)"></span>
            All Labs
            <span class="grind-filter__count">${sims.length}</span>
          </button>
          ${domains.map(d => {
            const count = sims.filter(s => s.pathName === d).length;
            const color = domainColorMap[d];
            return `
              <button class="grind-filter ${this._activeFilter === d ? 'is-active' : ''}" 
                      data-filter="${d}">
                <span class="grind-filter__dot" style="background: ${color}"></span>
                ${d}
                <span class="grind-filter__count">${count}</span>
              </button>
            `;
          }).join('')}
        </div>

        <!-- ─── Simulation Grid ─── -->
        <div class="grind-grid ${this._viewMode === 'list' ? 'grind-grid--list' : ''}" id="grind-grid">
          ${this._renderCards(sims, completed)}
        </div>

        <!-- ─── Empty State ─── -->
        <div class="grind-empty hidden" id="grind-empty">
          <div class="grind-empty__icon">
            ${renderTokenIcon('FOCUS', 'grind-empty__icon-svg')}
          </div>
          <h3>No simulations found</h3>
          <p class="text-muted">Try adjusting your search or filter criteria.</p>
        </div>
      </div>
    `;
  }

  _renderCards(sims, completed) {
    return sims.map((sim, i) => {
      const route = sim.launchRoute || SIMULATION_ROUTE_MAP[sim.id] || '#';
      const isModuleDone = completed.has(sim.moduleId);
      const diffLabels = { 1: 'Beginner', 2: 'Intermediate', 3: 'Advanced' };
      const diffClasses = { 1: 'grind-diff--easy', 2: 'grind-diff--mid', 3: 'grind-diff--hard' };
      const diffLabel = diffLabels[sim.difficulty] || 'Beginner';
      const diffClass = diffClasses[sim.difficulty] || 'grind-diff--easy';

      // Get best score for this module
      const scores = stateManager.getState('quizScores') || {};
      const moduleScores = scores[sim.moduleId] || [];
      const bestScore = moduleScores.length > 0
        ? Math.max(...moduleScores)
        : null;

      return `
        <a href="#${route}" 
           class="grind-card ${isModuleDone ? 'grind-card--done' : ''} ${!sim.implemented ? 'grind-card--blueprint' : ''}" 
           data-path="${sim.pathName}" 
           data-search="${sim.label.toLowerCase()} ${sim.moduleName.toLowerCase()} ${sim.pathName.toLowerCase()}"
           style="--card-color: ${sim.pathColor}; --card-delay: ${i * 40}ms">
          
          <div class="grind-card__accent"></div>
          
          <div class="grind-card__header">
            <div class="grind-card__icon-wrap" style="--icon-bg: ${sim.pathColor}">
              ${renderTokenIcon(sim.icon, 'grind-card__icon')}
            </div>
            <div class="grind-card__badges">
              ${isModuleDone ? `<span class="grind-badge grind-badge--done">${renderTokenIcon('OK', 'grind-badge__tick')}Done</span>` : ''}
              ${!sim.implemented ? '<span class="grind-badge grind-badge--blueprint">Blueprint</span>' : ''}
            </div>
          </div>
          
          <h3 class="grind-card__title">${sim.label}</h3>
          
          <div class="grind-card__meta">
            <span class="grind-card__domain" style="--domain-color: ${sim.pathColor}">
              ${sim.pathName}
            </span>
            <span class="grind-card__diff ${diffClass}">${diffLabel}</span>
          </div>

          <p class="grind-card__source">
            <span class="text-muted">from</span> ${sim.moduleName}
          </p>
          
          <div class="grind-card__footer">
            ${bestScore !== null ? `
              <div class="grind-card__score">
                <div class="grind-card__score-bar">
                  <div class="grind-card__score-fill" style="width: ${bestScore}%; --score-color: ${bestScore >= 80 ? 'var(--color-success)' : bestScore >= 60 ? 'var(--color-warning)' : 'var(--color-error)'}"></div>
                </div>
                <span class="grind-card__score-value">${bestScore}%</span>
              </div>
            ` : `
              <span class="grind-card__cta">${sim.implemented ? 'Start Lab →' : 'View Blueprint →'}</span>
            `}
          </div>
        </a>
      `;
    }).join('');
  }

  /* ════════════════════════════════════════
     EVENTS
     ════════════════════════════════════════ */

  _bindEvents() {
    // Filter tabs
    const filterBtns = this.container.querySelectorAll('.grind-filter');
    filterBtns.forEach(btn => {
      const handler = () => {
        this._activeFilter = btn.dataset.filter;
        filterBtns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        this._applyFilters();
      };
      btn.addEventListener('click', handler);
    });

    // Search
    const searchInput = this.container.querySelector('#grind-search');
    if (searchInput) {
      this._handlers.search = (e) => {
        this._searchQuery = e.target.value.toLowerCase().trim();
        this._applyFilters();
      };
      searchInput.addEventListener('input', this._handlers.search);
    }

    // View toggle
    const viewBtns = this.container.querySelectorAll('.grind-view-btn');
    viewBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this._viewMode = btn.dataset.view;
        viewBtns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        const grid = this.container.querySelector('#grind-grid');
        if (grid) {
          grid.classList.toggle('grind-grid--list', this._viewMode === 'list');
        }
      });
    });
  }

  _applyFilters() {
    const cards = this.container.querySelectorAll('.grind-card');
    const emptyEl = this.container.querySelector('#grind-empty');
    let visibleCount = 0;

    cards.forEach(card => {
      const matchesFilter = this._activeFilter === 'all' || card.dataset.path === this._activeFilter;
      const matchesSearch = !this._searchQuery || card.dataset.search.includes(this._searchQuery);
      const visible = matchesFilter && matchesSearch;

      card.style.display = visible ? '' : 'none';
      if (visible) visibleCount++;
    });

    if (emptyEl) {
      emptyEl.classList.toggle('hidden', visibleCount > 0);
    }
  }

  /* ════════════════════════════════════════
     LIFECYCLE
     ════════════════════════════════════════ */

  start() {}
  step() {}
  reset() {
    this._activeFilter = 'all';
    this._searchQuery = '';
    this._render();
    this._bindEvents();
  }
  destroy() {
    this._handlers = {};
    this.container = null;
  }
}

export default new SimulationsHub();
