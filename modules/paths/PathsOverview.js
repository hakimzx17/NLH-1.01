/**
 * PathsOverview.js — CCNA Domains Overview Page
 * Premium card-based overview of all six CCNA domains with
 * progress rings, status indicators, and inline stats.
 */

import { progressEngine } from '../../js/progressEngine.js';
import { ALL_PATHS }      from '../../data/pathRegistry.js';
import { renderTokenIcon } from '../../utils/tokenIcons.js';

class PathsOverview {
  constructor() {
    this.container = null;
  }

  init(containerEl) {
    this.container = containerEl;
    this._render();
  }

  /* ════════════════════════════════════════
     VIEW MODEL
     ════════════════════════════════════════ */

  _getDomainViewModel(path) {
    const isUnlocked    = progressEngine.isPathUnlocked(path, ALL_PATHS);
    const pathDone      = path.modules.filter(m => progressEngine.isTopicComplete(m.id)).length;
    const pathTotal     = path.topicCount || path.modules.length;
    const pct           = pathTotal > 0 ? Math.round((pathDone / pathTotal) * 100) : 0;
    const finalPassed   = progressEngine.isDomainFinalPassed(path.id);
    const isComplete    = progressEngine.isPathComplete(path);
    const finalUnlocked = progressEngine.isDomainFinalUnlocked(path);
    const prereqTitles  = (path.prerequisites || [])
      .map(preId => ALL_PATHS.find(c => c.id === preId)?.title || preId)
      .join(', ');

    return { isUnlocked, pathDone, pathTotal, pct, finalPassed, isComplete, finalUnlocked, prereqTitles };
  }

  /* ════════════════════════════════════════
     RENDER
     ════════════════════════════════════════ */

  _render() {
    // Overall stats
    const totalTopics = ALL_PATHS.reduce((s, p) => s + (p.topicCount || p.modules.length), 0);
    const doneTopics  = ALL_PATHS.reduce((s, p) => s + p.modules.filter(m => progressEngine.isTopicComplete(m.id)).length, 0);
    const overallPct  = totalTopics > 0 ? Math.round((doneTopics / totalTopics) * 100) : 0;
    const domainsComplete = ALL_PATHS.filter(p => progressEngine.isPathComplete(p)).length;

    this.container.innerHTML = `
      <div class="domains-page">
        <!-- ─── Header ─── -->
        <div class="domains-page__header">
          <div class="module-header__breadcrumb">
            <a href="#/">Home</a> › <span>CCNA Domains</span>
          </div>
          <div class="domains-page__header-row">
            <div class="domains-page__header-text">
              <h1 class="domains-page__title">CCNA <span class="domains-page__accent">Domains</span></h1>
              <p class="domains-page__subtitle">
                Six domains. One certification. Master each domain sequentially — 
                complete every topic and pass the final exam to unlock the next.
              </p>
            </div>
            <div class="domains-page__overview-stats">
              <div class="domains-overview-ring">
                <svg viewBox="0 0 72 72" class="domains-overview-ring__svg">
                  <circle cx="36" cy="36" r="30" class="domains-overview-ring__track"/>
                  <circle cx="36" cy="36" r="30" class="domains-overview-ring__fill" style="--pct: ${overallPct}"/>
                </svg>
                <span class="domains-overview-ring__value">${overallPct}<small>%</small></span>
              </div>
              <div class="domains-overview-meta">
                <span class="domains-overview-meta__big">${doneTopics}<small>/${totalTopics}</small></span>
                <span class="domains-overview-meta__label">Topics Done</span>
              </div>
              <div class="domains-overview-meta">
                <span class="domains-overview-meta__big">${domainsComplete}<small>/6</small></span>
                <span class="domains-overview-meta__label">Domains</span>
              </div>
            </div>
          </div>
        </div>

        <!-- ─── Domain Timeline ─── -->
        <div class="domains-timeline">
          ${(() => {
            let expandedIndex = ALL_PATHS.findIndex(p => {
              const vm = this._getDomainViewModel(p);
              return vm.isUnlocked && !vm.isComplete;
            });
            if (expandedIndex === -1) expandedIndex = ALL_PATHS.length - 1; // if all complete, expand last
            
            return ALL_PATHS.map((path, i) => this._renderDomainNode(path, i, i === expandedIndex)).join('');
          })()}
        </div>
      </div>
    `;

    // Attach click listeners to dots for accordion expand/collapse
    const nodes = this.container.querySelectorAll('.domain-node');
    nodes.forEach(node => {
      const dot = node.querySelector('.domain-node__dot');
      if (dot) {
        dot.addEventListener('click', (e) => {
          e.preventDefault();
          const isExpanded = node.classList.contains('domain-node--expanded');
          
          // Accordion behavior: close others
          nodes.forEach(n => n.classList.remove('domain-node--expanded'));
          
          if (!isExpanded) {
            node.classList.add('domain-node--expanded');
          }
        });
      }
    });
  }

  _renderDomainNode(path, index, isExpanded) {
    const vm = this._getDomainViewModel(path);
    const statusClass = vm.isComplete ? 'complete' : vm.isUnlocked ? 'unlocked' : 'locked';
    const expandClass = isExpanded ? 'domain-node--expanded' : '';

    const actionText = vm.isComplete
      ? 'Review Domain'
      : vm.pathDone > 0 ? 'Continue' : 'Start Domain';

    // Build mini topic dots for the side card
    const topicDots = path.modules.map(mod => {
      const done = progressEngine.isTopicComplete(mod.id);
      return `<span class="dcard__topic-dot ${done ? 'dcard__topic-dot--done' : ''}" title="${mod.title}"></span>`;
    }).join('');

    const iconHtml = renderTokenIcon(path.icon, 'domain-node__icon');

    const contentHtml = `
      <div class="domain-node__content">
        <div class="domain-node__expander">
          <div class="domain-node__content-inner">
            <h3 class="domain-node__content-title">${path.title}</h3>
            <p class="domain-node__desc">${path.description}</p>
        <div class="domain-node__stats">
          <span class="domain-node__stat">~${path.estimatedHours}h</span>
          <span class="domain-node__stat">${path.topicCount} topics</span>
          <span class="domain-node__stat">${path.examWeight}% Weight</span>
        </div>
        <div class="domain-node__progress">
          <div class="domain-node__progress-info">
            <span>${vm.pathDone}/${vm.pathTotal} complete</span>
            <span style="color: var(--d-color); font-weight: bold;">${vm.pct}%</span>
          </div>
          <div class="domain-node__progress-track">
            <div class="domain-node__progress-fill" style="width: ${vm.pct}%; background: var(--d-color);"></div>
          </div>
        </div>
        ${vm.isUnlocked ? `
          <a href="#/paths/${path.id}" class="domain-node__btn" style="--d-color: ${path.color}">
            ${actionText}
          </a>
        ` : `
          <div class="domain-node__locked-msg">
            Complete <strong>${vm.prereqTitles}</strong> first
          </div>
        `}
          </div>
        </div>
      </div>
    `;

    return `
      <div class="domain-node domain-node--${statusClass} ${expandClass}" style="--d-color: ${path.color};">
        ${contentHtml}
        
        <a href="javascript:void(0)" class="domain-node__dot">
          ${statusClass === 'locked' ? `
            <div class="domain-node__lock">
              ${renderTokenIcon('LOCK', '')}
            </div>
          ` : ''}
          ${iconHtml}
          <span class="domain-node__title">${path.id.replace('ccna-', '').toUpperCase()}</span>
        </a>
      </div>
    `;
  }

  start() {}
  step() {}
  reset() { this._render(); }
  destroy() { this.container = null; }
}

export default new PathsOverview();
