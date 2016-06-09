import React from 'react';
import { render } from 'react-dom';

import SingleModuleExample from './single-module/app';
import MultiModuleExample from './multi-module/app';
import MiddlewareExample from './module-with-middleware/app';

const Examples = () => (
  <div>
    <SingleModuleExample />
    <MultiModuleExample />
    <MiddlewareExample />
  </div>
);

document.addEventListener('DOMContentLoaded', () => {
  const node = document.querySelector('#examples');
  render(<Examples />, node);
});
