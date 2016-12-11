import React from 'react';
import { render } from 'react-dom';

const Examples = () => (
  <div>

  </div>
);

document.addEventListener('DOMContentLoaded', () => {
  const node = document.querySelector('#examples');
  render(<Examples />, node);
});
