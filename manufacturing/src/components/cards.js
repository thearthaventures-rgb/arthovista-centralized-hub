import { h } from '../lib/dom.js';
import { icon } from './icons.js';
import { track, ANALYTICS_EVENTS } from '../lib/analytics.js';

/* ServiceCard — value, short explanation, benefits, optional CTA. */
export function ServiceCard({ icon: name = 'shield', iconTone = 'orange', index, role, title, text, bullets = [], cta, placeholder = false }) {
  const body = [
    h('div', { class: 'service-card__top' }, [
      h('div', { class: `service-card__icon service-card__icon--${iconTone}` }, icon(name, 26, 2)),
      h('div', { class: 'service-card__marks' }, [
        index ? h('span', { class: 'service-card__num', 'aria-hidden': 'true' }, String(index).padStart(2, '0')) : null,
        role ? h('span', { class: 'service-card__role', 'aria-hidden': 'true' }, role) : null
      ])
    ]),
    h('h3', { class: 'service-card__title', html: title }),
    h('p', { class: 'service-card__text' }, text),
    ...(bullets.length
      ? [h('ul', { class: 'service-card__list' }, bullets.map((b) => h('li', {}, b)))]
      : [])
  ];
  if (cta) {
    body.push(h('a', {
      href: cta.href,
      class: 'service-card__cta',
      'data-cta-anchor': 'service',
      'data-service': title
    }, cta.label));
  }
  return h('div', { class: 'service-card reveal' }, body);
}

/* IndustryCard — only used with verified ArthoVista data (§12). */
export function IndustryCard({ icon: name = 'factory', title, text }) {
  return h('div', { class: 'industry-card reveal' }, [
    h('div', { class: 'industry-card__icon' }, icon(name, 24, 2)),
    h('h3', { class: 'industry-card__title' }, title),
    h('p', { class: 'industry-card__text' }, text)
  ]);
}

/* BenefitCard — used for "why us" placements. */
export function BenefitCard({ icon: name = 'star', title, text }) {
  return h('div', { class: 'benefit-card reveal' }, [
    h('div', { class: 'benefit-card__icon' }, icon(name, 22, 2)),
    h('div', {}, [
      h('h3', { class: 'benefit-card__title' }, title),
      h('p', { class: 'benefit-card__text' }, text)
    ])
  ]);
}

/* DocCard — documentation checklist item. */
export function DocCard({ icon: name = 'file', title, text }) {
  return h('div', { class: 'doc-item reveal' }, [
    h('div', { class: 'doc-item__icon' }, icon(name, 22, 2)),
    h('div', {}, [
      h('h3', { class: 'doc-item__title' }, title),
      h('p', { class: 'doc-item__text' }, text)
    ])
  ]);
}

export function wireServiceCta() {
  document.querySelectorAll('[data-cta-anchor="service"]').forEach((a) => {
    a.addEventListener('click', () => {
      track(ANALYTICS_EVENTS.serviceCta, { service: a.getAttribute('data-service') || 'unknown' });
    });
  });
}