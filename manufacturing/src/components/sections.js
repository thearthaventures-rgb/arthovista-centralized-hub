import { h } from '../lib/dom.js';
import { icon } from './icons.js';
import { track, ANALYTICS_EVENTS } from '../lib/analytics.js';

/* FAQ accordion. */
export function FAQAccordion({ items }) {
  const wrap = h('div', { class: 'faq' });
  items.forEach((item, i) => {
    const bodyId = `faq-panel-${i}`;
    const body = h('div', { class: 'faq-item__a', id: bodyId }, [h('p', {}, item.a)]);
    const btn = h('button', {
      class: 'faq-item__q',
      type: 'button',
      'aria-expanded': 'false',
      'aria-controls': bodyId,
      id: `faq-question-${i}`
    }, [
      h('span', {}, item.q),
      h('span', { class: 'faq-item__caret' }, icon('checkSmall', 18, 2.5))
    ]);
    const itemEl = h('div', { class: 'faq-item reveal', dataset: { open: 'false' } }, [
      btn,
      body
    ]);
    btn.addEventListener('click', () => {
      const open = itemEl.getAttribute('data-open') === 'true';
      wrap.querySelectorAll('.faq-item').forEach((el) => {
        el.setAttribute('data-open', 'false');
        el.querySelector('.faq-item__a').style.maxHeight = null;
        const q = el.querySelector('.faq-item__q');
        q.setAttribute('aria-expanded', 'false');
      });
      if (!open) {
        itemEl.setAttribute('data-open', 'true');
        body.style.maxHeight = body.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
        track(ANALYTICS_EVENTS.faqOpen, { question: item.q });
      }
    });
    wrap.appendChild(itemEl);
  });
  return wrap;
}

/* BannerCTA — gradient banner. */
export function BannerCTA({ title, text, cta, variant = 'blue' }) {
  const btn = h('a', { href: cta.href, class: 'btn btn--white btn--lg', 'data-cta-anchor': 'banner' }, cta.label);
  btn.addEventListener('click', () => track(ANALYTICS_EVENTS.heroCta, { label: 'banner_cta' }));
  return h('div', { class: 'banner reveal' }, [
    h('h2', { class: 'banner__title' }, title),
    h('p', { class: 'banner__text' }, text),
    btn
  ]);
}

/* Hero component (rich).
   Deep-navy institutional foundation with the white result card — the
   carousel of static-promo trims is removed. Trust renders as capability
   chips + an execution statement, not cherry-picked logotypes. */
export function Hero({ data, branding }) {
  const t = data.title;
  const titleHtml = `${t.pre}<span class="hl-orange">${t.hl}</span>${t.post || ''}`;
  return h('section', { class: 'hero', id: 'top' }, [
    h('div', { class: 'container hero__inner' }, [
      h('div', { class: 'hero__copy' }, [
        h('span', { class: 'hero__eyebrow' }, [h('span', { class: 'hero__eyebrow-dot' }), data.badge]),
        h('h1', { class: 'hero__title', html: titleHtml }),
        h('p', { class: 'hero__lead' }, data.lead),
        h('div', { class: 'hero__ctas' }, [
          h('a', { href: data.ctaPrimary.href, class: 'btn btn--primary btn--lg', 'data-cta-anchor': 'hero-primary' }, data.ctaPrimary.label),
          h('a', { href: data.ctaSecondary.href, class: 'btn btn--ghost btn--lg btn--ghost-on-dark', 'data-cta-anchor': 'hero-secondary' }, data.ctaSecondary.label)
        ]),
        h('div', { class: 'hero__capabilities' },
          data.trust.map((cap) => h('span', { class: 'hero__cap' }, cap))
        ),
        h('p', { class: 'hero__trustline' }, data.trustLine)
      ]),
      h('div', { class: 'hero__visual' }, [
        h('div', { class: 'hero-card' }, [
          h('img', { class: 'hero-card__logo', src: branding.logo, alt: 'ArthoVista logo', width: '120', height: '120' }),
          h('h2', { class: 'hero-card__title' }, data.card.title),
          h('p', { class: 'hero-card__sub' }, data.card.subtitle),
          h('div', { class: 'stat-grid' },
            data.card.stats.map((s) =>
              h('div', { class: 'stat-card' }, [
                h('div', { class: 'stat-card__num' }, s.num),
                h('div', { class: 'stat-card__label' }, s.label)
              ])
            )
          )
        ])
      ])
    ])
  ]);
}

/* Final CTA band. */
export function CtaBand({ title, text, cta }) {
  const btn = h('a', { href: cta.href, class: 'btn btn--white btn--lg', 'data-cta-anchor': 'band' }, cta.label);
  btn.addEventListener('click', () => track(ANALYTICS_EVENTS.heroCta, { label: 'final_band' }));
  return h('div', { class: 'cta-band reveal' }, [
    h('h2', { class: 'cta-band__title' }, title),
    h('p', { class: 'cta-band__text' }, text),
    btn
  ]);
}