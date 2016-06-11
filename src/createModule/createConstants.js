import { reduce } from 'ramda';
import camelize from 'camel-case';

const generateConstants = (generatedConstants, transformation) => {
  const { formattedConstant, action } = transformation;
  const camelizedActionName = camelize(action);

  // eslint-disable-next-line no-param-reassign
  generatedConstants[camelizedActionName] = formattedConstant;
  return generatedConstants;
};

export const createConstants = transformations => reduce(generateConstants, {}, transformations);

export default createConstants;
