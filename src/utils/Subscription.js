import { forEach, unset } from 'lodash';

export default class Subscription {
  constructor(store, parentSub, onStateChange) {
    this.subscribe = parentSub
      ? ::parentSub.addNestedSub
      : store.subscribe;

    this.onStateChange = onStateChange;
    this.lastNestedSubId = 0;
    this.unsubscribe = null;
    this.nestedSubs = {};

    this.notifyNestedSubs = ::this.notifyNestedSubs;
  }

  addNestedSub(listener) {
    this.trySubscribe();
    this.lastNestedSubId += 1;
    const id = this.lastNestedSubId;
    this.nestedSubs[id] = listener;
    return () => unset(this.nestedSubs, id);
  }

  isSubscribed() {
    return Boolean(this.unsubscribe);
  }

  notifyNestedSubs() {
    forEach(this.nestedSubs, nestedSub => nestedSub());
  }

  trySubscribe() {
    if (this.unsubscribe) {
      return;
    }

    this.unsubscribe = this.subscribe(() => this.onStateChange(this.notifyNestedSubs));
  }

  tryUnsubscribe() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    this.unsubscribe = null;
  }
}
