import shallowEqual from './shallowEqual';

export const memoizeProps = () => {
  let lastProps;
  let result;
  return nextProps => {
    if (lastProps !== nextProps) {
      if (!lastProps || !shallowEqual(lastProps, nextProps)) {
        result = nextProps;
      }
      lastProps = nextProps;
    }
    return result;
  };
};

export default memoizeProps;
