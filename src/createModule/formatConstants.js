import { curry } from 'ramda';

const appendFormattedConstant = curry(
  (modulePrefix, transform) => ({
    ...transform,
    formattedConstant: `${modulePrefix}/${transform.action}`,
  })
);

export const formatConstants = curry(
  (modulePrefix, transformations) => transformations.map(appendFormattedConstant(modulePrefix))
);

export default formatConstants;
