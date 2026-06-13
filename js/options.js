'use strict';

// const -------------
const CSS_TEMPLATE = `
  all: initial;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">{bgshape}{fgshape}</svg>');
  filter: drop-shadow(0 0 5px {shcolor});
  background-size: 48px 48px;
  height: 48px;
  width: 48px;
  transition: transform 300ms cubic-bezier(0.2, 0, 0, 1), opacity 300ms ease;
  display: inline-block;
  position: fixed;
  left: 0;
  top: 0;
  overflow: hidden;
  z-index: 2147483647;
  will-change: transform, opacity;
`;

const SHAPES = {
  fg: [
    { name: 'default', svg: '<path stroke="{fg}" fill="none" stroke-linecap="round" d="M15 14.7a4 4 0 1 1 1-2m-1.5-1l1.5 1.5 1.5-1.5"/>' },
    { name: 'simple-arrow', svg: '<path stroke="{fg}" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8m0-5v5h5"/>' },
    { name: 'double-arrow', svg: '<path stroke="{fg}" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M19.07 4.93a10 10 0 0 0-14.14 0l-1.41 1.41M3.5 1.5v5h5 M4.93 19.07a10 10 0 0 0 14.14 0l1.41-1.41M20.5 22.5v-5h-5"/>' },
    { name: 'plus', svg: '<path stroke="{fg}" fill="none" d="M12 8v8m-4-4h8"/>' },
    { name: 'cross', svg: '<path stroke="{fg}" fill="none" d="M9 9l6 6m0-6l-6 6"/>' },
    { name: 'heart', svg: '<path stroke="{fg}" fill="none" d="M12 16c0 0 0 0 3-2.5s-1-6-3-2c-2-4-6-0.5-3 2c3 2.5 3 2.5 3 2.5z"/>' },
    { name: 'heart-filled', svg: '<path fill="{fg}" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>' },
    { name: 'flower', svg: '<path stroke="{fg}" fill="none" stroke-width="0.4" d="M12 12a2 2 0 1 0 0.01 0za2 2 0 1 0-0.01 0.2za2 2 0 1 0 0-0.01za2 2 0 1 0-0.6-0.1z"/>' },
    { name: 'star', svg: '<path stroke="{fg}" fill="none" d="M12 7.5 13.06 10.54 16.28 10.61 13.71 12.56 14.65 15.64 12 13.8 9.35 15.64 10.29 12.56 7.72 10.61 10.94 10.54z"/>' },
    { name: 'sakura', svg: '<path fill="{fg}" d="M12 8l0.5-1q1.2 1.4 1.1 2.8q1 -0.6 3 0.2l-0.8 0.7 1.1 0.2q-1 1.7-2.3 2q1 1 0.7 2.9l-0.9-0.6 0.1 1.1q-1.3-0.1-2.5-1.5q-1 1.3-2.5 1.5l0.1-1-0.9 0.4q-0.3-1.2 0.6-2.8q-1.3-0.5-2.2-2l1-0.1-0.7-0.8q1.6-0.8 3-0.2q-0.3-1 1.1-2.8z"/>' },
    { name: 'fox', svg: '<path fill="{fg}" d="M12 10l2-1.7 0.7 2.7 1.3 2-4 2.3-4-2.3 1.3-2 0.7-2.7z"/>' },
    { name: 'cat', svg: '<path fill="{fg}" d="M6 3l2.5 4.5h7L18 3l1 5.5a8 8 0 1 1-14 0L6 3zm2 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm8 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-5.5.5l1.5 1 1.5-1H10.5z"/>' },
    { name: 'ghost', svg: '<path fill="{fg}" d="M12 2a8 8 0 0 0-8 8v10l3-2 3 2 3-2 3 2 3-2v-10a8 8 0 0 0-8-8zm-3 8a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm6 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>' },
    { name: 'rocket', svg: '<path fill="{fg}" d="M12 2s4 4 4 9v6l2 2H6l2-2v-6c0-5 4-9 4-9zM8 17h8v2H8zm4-11a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>' },
    { name: 'coffee', svg: '<path stroke="{fg}" fill="none" stroke-width="1.5" stroke-linecap="round" d="M5 9h11v7a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V9zm11 2h2a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-2M9 3v3M12 3v3M15 3v3"/>' },
    { name: 'rabbit', svg: '<path fill="{fg}" transform="scale(0.5)" d="M14 28q0 5 10 5 10 0 10-5 0-3-3-5c4-12-7-11-5-1.5q-2-0.5-4 0c1-10-9-10-5 1.5q-3 1.5-3 5"/>' },
    { name: 'bear', svg: '<path fill="{fg}" transform="scale(0.5)" d="M14 28q1 5 10 5 9.5 0 10-5 0.5-4-2-6c5-6-7-9 -6-2q-2-0.5-4 0c1-7-11-4-6 2q-2.5 2-2 6"/>' },
    { name: 'umbrella', svg: '<g fill="{fg}" transform="rotate(-30 12 12) translate(7 7) scale(0.4)"><path d="M1.5 15c-4-18 25-18 21 0q-3.5-2-7 0-3.5-2-7 0-3.5-2-7 0"/><circle cx="12" cy="1" r="1"/><path d="M11 13v7q0 4 4 4 4 0 4-4h-2q0 2-2 2-2 0-2-2v-7"/></g>' },
    { name: 'spiral', svg: '<path stroke="{fg}" fill="none" d="M12 12 c1.8 0 1.8 2.16 0 2.4 c-3 0-3-4.2 0-4.44 c4.56-0.6 5.04 6.6 0 6.72 c-6-0.24-6-8.4 0-8.88 c3.6-0.24 6 2.4 5.76 6 "/>' },
    { name: 'face', svg: '<path stroke="{fg}" fill="none" d="M 9 13q1.5 2 3 0q1.5 2 3 0m2-3v2m-10 0v-2"/>' },
    { name: 'smilleglassses', svg: '<path stroke="{fg}" fill="none" d="M5.2 9.2h4.8v3.8H5.2zM14 9.2h4.8v3.8H14zM10 11.1h4M8.7 15.4c.9 1.1 2 1.7 3.3 1.7s2.4-.6 3.3-1.7"/>' },
    { name: 'glasses', svg: '<path stroke="{fg}" fill="none" d="M2 9c0-1 0.8-2 2-2h4c1.2 0 2 1 2 2v1h4V9c0-1 0.8-2 2-2h4c1.2 0 2 1 2 2v3c0 1.7-1.3 3-3 3h-2c-1.7 0-3-1.3-3-3v-1H10v1c0 1.7-1.3 3-3 3H5c-1.7 0-3-1.3-3-3V9z"/><path stroke="{fg}" opacity="0.15" d="M4 9h4v2H4zM16 9h4v2h-4z"/>' },
    { name: 'cloud', svg: '<path fill="{fg}" d="M9 18a4 4 0 1 1 .7-7.94A5 5 0 0 1 19 12a3 3 0 0 1-1 5.83H9z"/>' },
    { name: 'moon', svg: '<path fill="{fg}" d="M12 4c0-.23.01-.45.03-.67A6 6 0 1 0 18.67 12c-.22.02-.44.03-.67.03A6 6 0 0 1 12 4z"/>' },
    { name: 'lightning', svg: '<path fill="{fg}" d="M13 6L9 13h3l-1 5 4-7h-3l1-5z"/>' },
    { name: 'bolt', svg: '<path fill="{fg}" d="M13 2L6 12h5v10l7-10h-5V2z"/>' },
    { name: 'flame', svg: '<path fill="{fg}" d="M12 2C8 6 6 9.5 6 13a6 6 0 0 0 12 0c0-4.5-3-8.5-6-11zm-2 13.5c-.3-.5-.5-1.1-.5-1.8 0-1.7 1.3-3 3-3 .5 0 1 .1 1.4.3-.8.7-1.4 1.7-1.4 2.7 0 1.1.9 2 2 2 .4 0 .8-.1 1.1-.3C15 17 13.5 18 12 18c-1 0-1.6-.3-2-2.5z"/>' },
    { name: 'diamond', svg: '<path fill="{fg}" d="M12 5l5 5-5 9-5-9 5-5z"/>' },
    { name: 'leaf', svg: '<path fill="{fg}" d="M12 3s5 6 5 10a5 5 0 0 1-10 0c0-4 5-10 5-10z"/>' },
    { name: 'empty', svg: '' },
  ],
  bg: [
    { name: 'circle', svg: '<circle fill="{bg}" cx="12" cy="12" r="12"/>' },
    { name: 'squircle', svg: '<path fill="{bg}" d="M12 0C1.6 0 0 1.6 0 12s1.6 12 12 12 12-1.6 12-12S22.4 0 12 0z"/>' },
    { name: 'hex', svg: '<path fill="{bg}" d="M24 12 18 22.4 6 22.4 0 12 6 1.6 18 1.6z"/>' },
    { name: 'octagon', svg: '<path fill="{bg}" d="M8.2 2h7.6l6.2 6.2v7.6l-6.2 6.2H8.2L2 15.8V8.2L8.2 2z"/>' },
    { name: 'pentagon', svg: '<path fill="{bg}" d="M12 1.5l10 7.3-3.8 11.7H5.8L2 8.8z"/>' },
    { name: 'triangle', svg: '<path fill="{bg}" d="M12 2.5l9.5 16.5A2 2 0 0 1 19.8 22H4.2a2 2 0 0 1-1.7-3L12 2.5z"/>' },
    { name: 'heart', svg: '<path fill="{bg}" d="M12 22c0 0 0 0 8.5-8s-3-18-8.5-8c-6-10-17 0.5-8.5 8c8.5 8 8.5 8 8.5 8z"/>' },
    { name: 'drop', svg: '<path fill="{bg}" d="M12 2.5s-7 6-7 12c0 3.9 3.1 7 7 7s7-3.1 7-7c0-6-7-12-7-12z"/>' },
    { name: 'droplet', svg: '<path fill="{bg}" stroke-width="1.5" d="M12 2.5S5 9 5 14a7 7 0 0 0 14 0c0-5-7-12-7-12zm0 15a4 4 0 0 1-4-4 1 1 0 0 1 2 0 2 2 0 0 0 2 2 1 1 0 0 1 0 2z"/>' },
    { name: 'cloud', svg: '<path fill="{bg}" d="M19.36 10.04a6 6 0 0 0-11.32-2.24 4.5 4.5 0 0 0-.64 8.7h12.1a4 4 0 0 0-.14-6.46z"/>' },
    { name: 'squre', svg: '<path fill="{bg}" d="M12 0l12 12-12 12-12-12z"/>' },
    { name: 'shield', svg: '<path fill="{bg}" d="M12 2L4 5v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V5l-8-3z"/>' },
    { name: 'star', svg: '<path fill="{bg}" d="M12 0l3.9 6.39 7.1 1.61-4.7 5.56 0.5 7.37-6.8-2.7-6.8 2.7 0.4-7.57-4.6-5.36 7-1.7z"/>', y: 2 },
    { name: 'sakura', svg: '<path fill="{bg}" d="M12 2.5l1.045 -2.299q3.553 3.553 2.404 6.479q2.195 -1.359 6.897 0.418l-1.881 1.568l2.508 0.418q-2.299 3.971 -4.9 4.703q2.299 2.299 1.568 6.688l-2.09 -1.359l0.209 2.508q-3.031 -0.209 -5.8 -3.449q-2.717 3.24 -5.748 3.449l0.209 -2.404l-2.09 1.045q-1.254 -3.135 1.6 -6.479q-3.553 -0.836 -5.121 -4.703l2.299 -0.209l-1.568 -1.881q3.658 -1.881 6.897 -0.418q-0.627 -2.613 2.508 -6.479z"/>' },
    { name: 'fox', svg: '<path fill="{bg}" d="M12 5l6-5 2 8 4 6-12 7-12-7 4-6 2-8z"/>', y: 3 },
    { name: 'rabbit', svg: '<path fill="{bg}" d="M2 14q0 5 10 5 10 0 10-5 0-3-3-5c4-12-7-11-5-1.5q-2-0.5-4 0c1-10-9-10-5 1.5q-3 1.5-3 5"/>', y: 4 },
    { name: 'bear', svg: '<path fill="{bg}" d="M2 14q1 5 10 5 9.5 0 10-5 0.5-4-2-6c5-6-7-9 -6-2q-2-0.5-4 0c1-7-11-4-6 2q-2.5 2-2 6"/>', y: 4 },
    { name: 'umbrella', svg: '<g fill="{bg}" transform="rotate(-30 12 12) translate(0 3.5)"><path d="M1.5 15c-4-18 25-18 21 0q-3.5-2-7 0-3.5-2-7 0-3.5-2-7 0"/><circle cx="12" cy="1" r="1"/><path d="M11 11.5v7q0 4 4 4 4 0 4-4h-2q0 2-2 2-2 0-2-2v-7"/></g>', y: -2 },
    { name: 'fish', svg: '<path fill="{bg}" d="M2 11.7l-1-0.7q8-4 19 1l3-2q-1 2.5 0 5l-3-2q-8 4-18.9-0.8z"/>' },
    { name: 'empty', svg: '' },
  ],
};

// Shapes -------------------
const setupShapes = () => {
  for (const fgbg of ['fg', 'bg']) {
    const f = document.createDocumentFragment();
    for (const s of SHAPES[fgbg]) {
      const item = document.createElement('DIV');
      item.className = `shape shape-${fgbg}`;
      item.setAttribute('data-shape-name', s.name);
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'button');
      item.setAttribute('aria-label', `${fgbg === 'fg' ? 'Foreground' : 'Background'} shape: ${s.name}`);
      const svg = s.svg.replace(`{${fgbg}}`, 'black');
      if (svg) {
        item.style.maskImage = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">${svg}</svg>')`;
        item.style.translate = `0 ${s.y || 0}px`;
      }
      f.appendChild(item);
    }
    byId(`${fgbg}shape`).appendChild(f);
  }
  highlightSelected();
  addEventListener('click', e => {
    const name = e.target.getAttribute('data-shape-name');
    if (name) {
      CoolRefresh.ini[e.target.parentNode.id] = name;
      highlightSelected();
      saveBindingValues();
    }
  });
};

const highlightSelected = () => {
  for (const fgbg of ['fg', 'bg']) {
    const key = `${fgbg}shape`;
    for (const item of allByClass(byId(key), 'shape')) {
      toggleClass(
        item.getAttribute('data-shape-name') === CoolRefresh.ini[key],
        'shape-selected',
        item
      );
    }
  }
};

const getShapeCSS = (fgbg) => {
  const s = SHAPES[fgbg].find(v => v.name === CoolRefresh.ini[`${fgbg}shape`]);
  return s.svg.replace(`{${fgbg}}`, CoolRefresh.ini[`${fgbg}color`].replace('#', '%23'));
};

// START HERE ! -------------
const mySettings = {
  storageKey: 'cool_refresh',
  getIni: () => CoolRefresh.ini,
  onInitialize() {
    setupShapes();
    CoolRefresh.reload = () => {
      setTimeout(() => { location.reload(); }, 800);
    };
  },
  onSavePre() {
    CoolRefresh.ini.css = CSS_TEMPLATE
      .replace('{bgshape}', getShapeCSS('bg'))
      .replace('{fgshape}', getShapeCSS('fg'))
      .replace('{shcolor}', CoolRefresh.ini.shcolor)
  },
  onSaveComplete() {
    CoolRefresh.loadIni();
  },
};

initialize(mySettings);