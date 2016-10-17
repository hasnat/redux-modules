export default transformations =>
  transformations.reduce((memo, transform) => ({
    ... memo,
    [transform.type]: transform,
  }), {});
