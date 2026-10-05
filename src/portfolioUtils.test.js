import test from 'node:test';
import assert from 'node:assert/strict';

import { normalizePortfolioData, withBaseUrl } from './portfolioUtils.js';

test('withBaseUrl prefixes asset URLs with the current Vite base path', () => {
  assert.equal(withBaseUrl('/assets/videos/Portfolio.mp4', '/anasshamsudheenportfolio/'), '/anasshamsudheenportfolio/assets/videos/Portfolio.mp4');
  assert.equal(withBaseUrl('https://example.com/video.mp4', '/anasshamsudheenportfolio/'), 'https://example.com/video.mp4');
});

test('normalizePortfolioData rewrites every portfolio video to respect the site base', () => {
  const data = normalizePortfolioData({ videos: [{ id: 1, title: 'Demo', category: 'Short-form', video: '/assets/videos/demo.mp4' }] }, '/anasshamsudheenportfolio/');

  assert.equal(data.videos[0].video, '/anasshamsudheenportfolio/assets/videos/demo.mp4');
});
