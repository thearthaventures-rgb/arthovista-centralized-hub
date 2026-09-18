import { h } from '../lib/dom.js';
import { icon } from './icons.js';

export function ChallengeItem({ num, title, text }) {
  return h('div', { class: 'challenge-item reveal' }, [
    h('span', { class: 'challenge-item__num' }, String(num)),
    h('div', {}, [
      h('h3', { class: 'challenge-item__title' }, title),
      h('p', { class: 'challenge-item__text' }, text)
    ])
  ]);
}

export function TrustBar({ label, items }) {
  return h('div', { class: 'trust-bar' }, [
    h('div', { class: 'container trust-bar__inner' }, [
      h('span', { class: 'trust-bar__label' }, label),
      ...items.map((t) => h('span', { class: 'trust-bar__item' }, [icon('checkSmall', 16, 2.5), t]))
    ])
  ]);
}

/* Lifecycle band — narrative solution architecture across
   START → STRUCTURE → FUND → COMPLY → DOCUMENT → SCALE. */
export function Lifecycle({ steps }) {
  return h('ol', { class: 'lifecycle' },
    steps.map((s, i) =>
      h('li', { class: 'lifecycle-step reveal' }, [
        h('div', { class: 'lifecycle-step__num' }, String(i + 1)),
        h('span', { class: 'lifecycle-step__phase' }, s.phase),
        h('h3', { class: 'lifecycle-step__title' }, s.title),
        h('p', { class: 'lifecycle-step__text' }, s.text)
      ])
    )
  );
}

/* AudienceDuo — starting vs growing manufacturer split panel. */
export function AudienceDuo({ start, grow }) {
  return h('div', { class: 'audience-duo' }, [
    h('div', { class: 'duo-panel duo-panel--blue reveal' }, [
      h('span', { class: 'duo-panel__tag' }, start.tag),
      h('h3', { class: 'duo-panel__title' }, start.title),
      h('ul', { class: 'duo-panel__points' }, start.points.map((p) => h('li', {}, [icon('check', 16, 2.5), h('span', {}, p)])))
    ]),
    h('div', { class: 'duo-panel duo-panel--accent reveal' }, [
      h('span', { class: 'duo-panel__tag' }, grow.tag),
      h('h3', { class: 'duo-panel__title' }, grow.title),
      h('ul', { class: 'duo-panel__points' }, grow.points.map((p) => h('li', {}, [icon('check', 16, 2.5), h('span', {}, p)])))
    ])
  ]);
}

export function SchemeRow({ flag, title, text, type }) {
  return h('div', { class: 'scheme-row reveal' }, [
    h('span', { class: 'scheme-row__flag' }, flag),
    h('div', {}, [
      h('h3', { class: 'scheme-row__title' }, title),
      h('p', { class: 'scheme-row__text' }, text)
    ]),
    h('span', { class: 'scheme-row__type' }, type)
  ]);
}

export function SchemeNote({ text }) {
  return h('div', { class: 'scheme-note reveal' }, [
    icon('shield', 20, 2),
    h('p', { html: `<strong>${text.split('.')[0]}.</strong>${text.slice(text.indexOf('.') + 1)}` })
  ]);
}

export function ContactInfo({ info }) {
  const rows = [
    { icon: 'phone', label: 'Call us', href: info.phoneHref, value: info.phone, track: 'phone' },
    { icon: 'whatsapp', label: 'WhatsApp', href: info.whatsappHref, value: info.whatsapp, track: 'whatsapp' },
    { icon: 'mail', label: 'Email', href: info.emailHref, value: info.email, track: 'email' },
    { icon: 'globe', label: 'Website', href: info.websiteHref, value: info.website, track: 'website' }
  ];
  return h('aside', { class: 'contact-panel reveal' }, [
    h('h3', { class: 'contact-panel__title' }, 'Prefer to reach us directly?'),
    ...rows.map((r) =>
      h('a', { href: r.href, class: 'contact-panel__row', 'data-contact-action': r.track, target: r.href.startsWith('http') ? '_blank' : undefined, rel: r.href.startsWith('http') ? 'noopener' : undefined }, [
        h('span', { class: 'contact-panel__icon' }, icon(r.icon, 18, 2)),
        h('span', { class: 'contact-panel__meta' }, [
          h('span', { class: 'contact-panel__label' }, r.label),
          h('span', { class: 'contact-panel__value' }, r.value)
        ])
      ])
    ),
    h('div', { class: 'contact-panel__offices' }, [
      h('h4', { class: 'contact-panel__offices-title' }, info.officesLabel),
      ...info.offices.map((o) =>
        h('p', { class: 'contact-panel__office' },
          `${o.city}${o.area ? `, ${o.area}` : ''}${o.tag ? ` — ${o.tag}` : ''}`
        )
      )
    ])
  ]);
}