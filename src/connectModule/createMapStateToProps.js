function getDependsOnOwnProps(mapToProps) {
  return (mapToProps.dependsOnOwnProps !== null && mapToProps.dependsOnOwnProps !== undefined)
    ? Boolean(mapToProps.dependsOnOwnProps)
    : mapToProps.length !== 1;
}

export default function createMapStateToProps(mapToProps) {
  const proxy = function mapToPropsProxy(state, ownProps) {
    return proxy.dependsOnOwnProps ?
      proxy.mapToProps(state, ownProps) :
      proxy.mapToProps(state);
  };
  proxy.dependsOnOwnProps = getDependsOnOwnProps(mapToProps);
  proxy.mapToProps = function detectFactoryAndVerify(state, ownProps) {
    proxy.mapToProps = mapToProps;
    const props = proxy(state, ownProps);
    if (typeof props !== 'function') {
      return props;
    }
    proxy.mapToProps = props;
    proxy.dependsOnOwnProps = getDependsOnOwnProps(props);
    return proxy(state, ownProps);
  };
  return proxy;
}
