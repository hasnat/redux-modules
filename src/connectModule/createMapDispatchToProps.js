import { get } from 'lodash';
import { bindActionCreators } from 'redux';

import toObject from '../utils/toObject';

export default function createMapDispatchToProps(modules) {
  return function mapDispatchToProps(dispatch, ownProps) {
    const dispatchFunc = get(ownProps, 'dispatch', dispatch);
    function bindDispatch({ actions }) {
      return bindActionCreators(actions, dispatchFunc);
    }
    if (modules.length === 1) {
      return {
        actions: bindDispatch(modules[0]),
        dispatch,
      };
    }
    return {
      dispatch,
      actions: toObject(modules, 'name', bindDispatch),
    };
  };
}
