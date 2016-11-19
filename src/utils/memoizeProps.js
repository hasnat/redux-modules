import { isEqual } from 'lodash';

export default function memoizeProps() {
  let props;
  return function selectProps(nextProps) {
    if (!isEqual(props, nextProps)) {
      props = nextProps;
    }
    return props;
  };
}
