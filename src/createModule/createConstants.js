import camelize from 'camel-case';

const generateConstants = (generatedConstants, { formattedConstant, action }) => {
  const camelizedActionName = camelize(action);

  // eslint-disable-next-line no-param-reassign
  generatedConstants[camelizedActionName] = formattedConstant;
  return generatedConstants;
};

export const createConstants = transformations => transformations.reduce(generateConstants, {});

export default createConstants;
