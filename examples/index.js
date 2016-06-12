import React from 'react';
import { render } from 'react-dom';

import MultiModuleExample from './multi-module/app';

const Examples = () => (
  <div>
    <MultiModuleExample />
  </div>
);

document.addEventListener('DOMContentLoaded', () => {
  const node = document.querySelector('#examples');
  render(<Examples />, node);
});
