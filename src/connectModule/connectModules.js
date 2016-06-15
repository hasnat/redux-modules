import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import combineNamespacedProps from './combineNamespacedProps';

const nestedBindDispatch = modules => dispatch =>
  modules.reduce((bna, { name, actions }) => {
    // eslint-disable-next-line no-param-reassign
    bna[name] = { actions: bindActionCreators(actions, dispatch) };
    return bna;
  }, {});

export const connectModules = (selector, modules, Component) => {
  const nestedBoundActions = nestedBindDispatch(modules);

  return connect(
    selector,
    nestedBoundActions,
    combineNamespacedProps
  )(Component);
};

export default connectModules;
