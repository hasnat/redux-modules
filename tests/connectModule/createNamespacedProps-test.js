import { expect, should } from 'chai';
import createNamespacedProps from '../../src/connectModule/createNamespacedProps';

should();

describe('createNamespacedProps', () => {
  it('returns a combineProps function when invoked with no parameters', () => {
    const combineProps = createNamespacedProps();
    expect(typeof combineProps).to.equal('function');
    expect(combineProps.length).to.equal(3);
  });

  it('returns a combineProps function when invoked with namespace', () => {
    const combineProps = createNamespacedProps('test');
    expect(typeof combineProps).to.equal('function');
    expect(combineProps.length).to.equal(3);
  });

  describe('generated combineProps function without namespace', () => {
    const combineProps = createNamespacedProps();
    const stateProps = { foo: 'bar' };
    const dispatchProps = { bar: () => 'foo' };
    const props = { baz: 'bam' };

    const generatedProps = combineProps(stateProps, dispatchProps, props);

    it('should nest actions under actions key', () => {
      expect(generatedProps.actions).to.deep.equal(dispatchProps);
    });

    it('should contain props', () => {
      expect(generatedProps).to.contain(props);
    });

    it('should contain mapState props', () => {
      expect(generatedProps).to.contain(stateProps);
    });
  });

  describe('generated combineProps function with namespace', () => {
    const namespace = 'test';
    const combineProps = createNamespacedProps(namespace);
    const stateProps = { foo: 'bar' };
    const dispatchProps = { bar: () => 'foo' };
    const props = { baz: 'bam' };

    const generatedProps = combineProps(stateProps, dispatchProps, props);

    it('should nest actions under actions key', () => {
      expect(generatedProps[namespace].actions).to.deep.equal(dispatchProps);
    });

    it('should contain props NOT under namespace key', () => {
      expect(generatedProps).to.contain(props);
    });

    it('should contain mapState props under namespace key', () => {
      expect(generatedProps[namespace]).to.contain(stateProps);
    });
  });
});
