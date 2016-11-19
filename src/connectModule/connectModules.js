import hoistStatics from 'hoist-non-react-statics';
import { Component, createElement, PropTypes } from 'react';

import createFinalPropsSelector from './createFinalPropsSelector';
import createMapDispatchToProps from './createMapDispatchToProps';
import createMapStateToProps from './createMapStateToProps';
import memoizeProps from '../utils/memoizeProps';
import Subscription from '../utils/Subscription';
import storeShape from '../utils/storeShape';

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
        const sourceSelector = createFinalPropsSelector(
          createMapStateToProps(mapStateToProps),
          props => mapDispatchToProps(this.store.dispatch, props));

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
          this::onStoreStateChange);
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
