import invariant from 'invariant';

// eslint-disable-next-line import/prefer-default-export
export const propCheck = () => (action) => {
  invariant(true, 'redux-modules | middleware.propCheck is deprecated! Please use github.com/mboperator/redux-modules-middleware instead.');
  return action;
};
