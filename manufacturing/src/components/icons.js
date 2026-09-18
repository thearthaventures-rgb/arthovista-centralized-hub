/* Minimal inline SVG icon set (stroke-based, inherits currentColor). */

const NS = 'http://www.w3.org/2000/svg';

function svgIcon(paths, size = 22, sw = 2) {
  const s = document.createElementNS(NS, 'svg');
  s.setAttribute('viewBox', '0 0 24 24');
  s.setAttribute('width', String(size));
  s.setAttribute('height', String(size));
  s.setAttribute('fill', 'none');
  s.setAttribute('stroke', 'currentColor');
  s.setAttribute('stroke-width', String(sw));
  s.setAttribute('stroke-linecap', 'round');
  s.setAttribute('stroke-linejoin', 'round');
  s.setAttribute('aria-hidden', 'true');
  const wrap = document.createElementNS(NS, 'g');
  paths.forEach((p) => {
    const d = document.createElementNS(NS, 'path');
    d.setAttribute('d', p);
    d.setAttribute('fill', 'none');
    wrap.appendChild(d);
  });
  s.appendChild(wrap);
  return s;
}

export const ICONS = {
  check: ['M20 6L9 17l-5-5'],
  checkSmall: ['M20 6L9 17l-5-5'],
  factory: ['M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6'],
  cross: ['M12 3v18M3 12h18'],
  layers: ['M4 19L12 3l8 16M7 12h10'],
  star: ['M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4L4.2 7.7l5.4-.8z'],
  rupee: ['M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6'],
  doc: ['M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M9 12h6M9 16h6'],
  clock: ['M12 6v6l4 2', 'M12 2a10 10 0 100 20 10 10 0 000-20z'],
  chart: ['M4 20V10M10 20V4M16 20v-7M22 20H2'],
  shield: ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'],
  target: ['M12 2a7 7 0 100 14 7 7 0 000-14zM12 9v4M9 16.5L7 22h10l-2-5.5'],
  file: ['M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6'],
  gear: ['M12 2a7 7 0 100 14 7 7 0 000-14zM12 9v4'],
  tool: ['M12 19l7-7 3 3-7 7-3-3zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5zM2 2l7.586 7.586M11 13a2 2 0 100-4 2 2 0 000 4z'],
  handshake: ['M11 19l-2 3M15 19l2 3M8 12l3 3 5-5'],
  phone: ['M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L8 9.9a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.5c.9.3 1.8.6 2.8.7a2 2 0 011.8 2.1z'],
  whatsapp: ['M12 2.5a9.5 9.5 0 00-8.13 14.4L2.5 21.5l4.8-1.3A9.5 9.5 0 1012 2.5zM12 4.5a7.5 7.5 0 110 15 7.4 7.4 0 01-3.8-1L5 19l.6-3.2A7.5 7.5 0 0112 4.5z', 'M8.5 9.2c0 3.5 2.7 6.2 6.2 6.2a2 2 0 002-2c0-.3-.2-.5-.5-.6l-2-.8a.6.6 0 00-.6.1l-.4.4a4.8 4.8 0 01-2.4-2.4l.4-.4a.6.6 0 00.1-.6l-.8-2a.6.6 0 00-.6-.5 2 2 0 00-2 2z'],
  mail: ['M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z', 'M22 6l-10 7L2 6'],
  globe: ['M12 2a10 10 0 100 20 10 10 0 000-20z', 'M2 12h20M12 2c2.5 2.6 4 6 4 10s-1.5 7.4-4 10c-2.5-2.6-4-6-4-10s1.5-7.4 4-10z'],
  plus: ['M12 5v14M5 12h14']
};

export function icon(name, size = 22, sw = 2) {
  const paths = ICONS[name];
  if (!paths) return null;
  return svgIcon(paths, size, sw);
}