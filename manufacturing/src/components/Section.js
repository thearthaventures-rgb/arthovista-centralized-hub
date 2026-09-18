import { h } from '../lib/dom.js';

/* Section scaffold: heading cluster + body. Reused by every page section.
   Pass pre-rendered standalone blocks (hero, banner) via `className` +
   `children`; for standard content sections pass `kicker/title/lead`. */
export function Section({ id, tone = '', className = '', kicker, kTone, title, lead, children }) {
  let inner;
  if (kicker || title || lead) {
    const head = h('div', { class: 'section__head' }, [
      kicker ? h('span', { class: `section__kicker${kTone ? ` section__kicker--${kTone}` : ''}` }, kicker) : null,
      title ? h('h2', { class: 'section__title', html: renderTitle(title) }) : null,
      lead ? h('p', { class: 'section__lead' }, lead) : null
    ]);
    inner = h('div', { class: 'container' }, [head, ...(Array.isArray(children) ? children : [children])]);
  } else {
    inner = Array.isArray(children) ? children : [children];
  }
  const cls = ['section'];
  if (tone) cls.push(`section--${tone}`);
  if (className) cls.push(className);
  return h('section', { class: cls.join(' '), ...(id ? { id } : {}) }, inner);
}

function renderTitle(title) {
  if (typeof title === 'string') return title;
  if (Array.isArray(title)) {
    // Pattern [pre, hl, post] — highlight middle segment
    if (title.length === 3 && title[1]) return `${title[0]}<span class="hl-blue">${title[1]}</span>${title[2] || ''}`;
    return title.join('');
  }
  return '';
}

export default Section;