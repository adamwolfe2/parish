import { buildLegacyTheme } from 'sanity';

/**
 * Custom Studio theme that maps Sanity's color tokens to Bill's brand —
 * warm bone background, moss-green primary, basalt text. Removes the
 * default dark-navy feel and makes Studio recognizably part of the
 * Parish & Company site rather than a foreign CMS dropped in.
 */
const props = {
  '--my-white-color': '#F7F4EE',          // bone
  '--my-black-color': '#1A1F2B',          // basalt
  '--my-transparent-color': '#1A1F2B26',

  '--my-red-color': '#a23a3a',
  '--my-red-dark-color': '#7a2a2a',

  '--my-yellow-color': '#A88B5C',         // brass
  '--my-yellow-dark-color': '#86683f',

  '--my-green-color': '#4A6B4F',          // moss
  '--my-green-dark-color': '#3A5640',

  '--my-blue-color': '#4A6B4F',           // map "primary/info" to moss too
  '--my-blue-dark-color': '#3A5640',
};

export const studioTheme = buildLegacyTheme({
  '--black': props['--my-black-color'],
  '--white': props['--my-white-color'],

  '--gray': '#525866',
  '--gray-base': '#525866',

  '--component-bg': props['--my-white-color'],
  '--component-text-color': props['--my-black-color'],

  '--brand-primary': props['--my-green-color'],

  '--default-button-color': '#EBE6DD',
  '--default-button-primary-color': props['--my-green-color'],
  '--default-button-success-color': props['--my-green-color'],
  '--default-button-warning-color': props['--my-yellow-color'],
  '--default-button-danger-color': props['--my-red-color'],

  '--state-info-color': props['--my-green-color'],
  '--state-success-color': props['--my-green-color'],
  '--state-warning-color': props['--my-yellow-color'],
  '--state-danger-color': props['--my-red-color'],

  '--main-navigation-color': props['--my-black-color'],
  '--main-navigation-color--inverted': props['--my-white-color'],

  '--focus-color': props['--my-green-color'],
});
