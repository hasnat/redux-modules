const createNamespacedProps =
  (ns = '') => (mapStateProps, mapDispatchProps, props) => {
    const generatedProps = {
      ... mapStateProps,
      actions: { ... mapDispatchProps },
    };

    return ns
      ? { [ns]: { ... generatedProps }, ... props }
      : { ... generatedProps, ... props };
  };

export default createNamespacedProps;
