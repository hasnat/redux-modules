import hoistStatics from 'hoist-non-react-statics';
import { Component, createElement, PropTypes } from 'react';
import { bindActionCreators } from 'redux';

import memoizeProps from '../utils/memoizeProps';
import Subscription from '../utils/Subscription';
import storeShape from '../utils/storeShape';

import createFinalPropsSelector from '../selectors/getFinalProps';

export const createMapOrMapFactoryProxy = (mapToProps) => {
  let map;
  const firstRun = (storePart, props) => {
    const result = mapToProps(storePart, props);
    if (typeof result === 'function') {
      map = result;
      return map(storePart, props);
    }
    map = mapToProps;
    return result;
  };

  const proxy = (storePart, props) => (map || firstRun)(storePart, props);
  proxy.dependsOnProps = () => (map || mapToProps).length !== 1;
  return proxy;
};

export const createGetState = (mapStateToProps) => {
  const map = createMapOrMapFactoryProxy(mapStateToProps);
  const memoizeMapResult = memoizeProps();
  let lastState;
  let lastProps;
  let result;

  return (state, props) => {
    const nextProps = map.dependsOnProps() ? props : {};
    if (lastState !== state || lastProps !== nextProps) {
      result = memoizeMapResult(map(state, nextProps));
      lastState = state;
      lastProps = nextProps;
    }
    return result;
  };
};

export function selectorFactory({ dispatch, mapDispatchToProps, mapStateToProps }) {
  return createFinalPropsSelector({
    getDispatch: props => mapDispatchToProps(dispatch, props),
    getState: createGetState(mapStateToProps),
  });
}

export const createMapDispatchToProps = modules => (dispatch, ownProps) => {
  const props = {};
  const dispatchFunc = ownProps.dispatch || dispatch;

  if (modules.length === 1) {
    props.actions = bindActionCreators(
      modules[0].actions,
      dispatchFunc,
    );
  } else {
    for (let i = 0; i < modules.length; i += 1) {
      const { actions, name } = modules[i];
      if (!props.actions) {
        props.actions = {};
      }
      props.actions[name] = bindActionCreators(actions, dispatchFunc);
    }
  }
  return props;
};

let hotReloadingVersion = 0;
export default function connectModules(mapStateToProps, modules) {
  hotReloadingVersion += 1;
  const version = hotReloadingVersion;
  const mapDispatchToProps = createMapDispatchToProps(modules);

  return (WrappedComponent) => {
    class Connect extends Component {
      static contextTypes ={
        registerModule: PropTypes.func,
        store: storeShape.isRequired,
        storeSubscription: PropTypes.instanceOf(Subscription),
      };

      static childContextTypes ={
        storeSubscription: PropTypes.instanceOf(Subscription).isRequired,
      };

      constructor(props, context) {
        super(props, context);

        this.version = version;
        this.state = {};
        this.store = this.context.store;
        this.parentSub = this.context.storeSubscription;

        if (context.registerModule) {
          context.registerModule(modules);
        }

        this.initSelector();
        this.initSubscription();
      }

      getChildContext() {
        return {
          storeSubscription: this.subscription,
        };
      }

      componentDidMount() {
        this.subscription.trySubscribe();

        if (this.lastRenderedProps !== this.selector(this.props)) {
          this.forceUpdate();
        }
      }

      shouldComponentUpdate(nextProps) {
        return this.lastRenderedProps !== this.selector(nextProps);
      }

      componentWillUnmount() {
        this.subscription.tryUnsubscribe();
        this.subscription = {
          isSubscribed: () => false,
        };
        this.store = null;
        this.parentSub = null;
        this.selector = () => this.lastRenderedProps;
      }

      initSelector() {
        this.lastRenderedProps = null;

        const sourceSelector = selectorFactory({
          mapDispatchToProps,
          mapStateToProps,
          dispatch: this.store.dispatch,
        });

        const memoizeOwn = memoizeProps();
        const memoizeFinal = memoizeProps();

        this.selector = (ownProps) => {
          const state = this.store.getState();
          const props = memoizeOwn(ownProps);
          return memoizeFinal(sourceSelector(state, props));
        };
      }

      initSubscription() {
        const onStoreStateChange = (notifyNestedSubs) => {
          if (this.shouldComponentUpdate(this.props)) {
            this.setState({}, notifyNestedSubs);
          } else {
            notifyNestedSubs();
          }
        };

        this.subscription = new Subscription(
          this.store,
          this.parentSub,
          onStoreStateChange.bind(this));
      }

      isSubscribed() {
        return this.subscription.isSubscribed();
      }

      render() {
        this.lastRenderedProps = this.selector(this.props);

        return createElement(WrappedComponent, this.lastRenderedProps);
      }
    }

    if (process.env.NODE_ENV !== 'production') {
      Connect.prototype.componentWillUpdate = function componentWillUpdate() {
        if (this.version !== version) {
          this.version = version;
          this.initSelector();

          this.subscription.tryUnsubscribe();
          this.initSubscription();
          this.subscription.trySubscribe();
        }
      };
    }

    return hoistStatics(Connect, WrappedComponent);
  };
}
