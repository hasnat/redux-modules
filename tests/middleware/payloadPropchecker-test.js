import PropTypes from 'prop-types';
import sinon from 'sinon';
import { should } from 'chai';

import propCheck from '../../src/middleware/propCheck';

should();

const mockTransforms = [
  {
    type: 'MOCK_ONE',
    formattedConstant: 'mock/MOCK_ONE',
    payloadTypes: {
      name: PropTypes.string.isRequired,
    },
    metaTypes: {
      id: PropTypes.number.isRequired,
    },
  },
  {
    type: 'MOCK_TWO',
    formattedConstant: 'mock/MOCK_TWO',
    payloadTypes: {
      name: PropTypes.string.isRequired,
    },
    metaTypes: {
      id: PropTypes.number.isRequired,
    },
  },
];

const payload = {
  label: 'Joe',
};

describe('propCheck', () => {
  const objectSpy = sinon.spy();
  const funcSpy = sinon.spy();

  const objectSchema = {
    name: PropTypes.string.isRequired,
  };
  const functionSchema = PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired;

  const propCheckedPayloadCreator = (schema, cb) => propCheck(
    schema,
    {
      onError: (err) => {
        // eslint-disable-next-line no-console
        console.error('PROP CHECKER', err);
        cb(err);
      },
    },
  );

  propCheckedPayloadCreator(objectSchema, objectSpy)(
    {
      type: mockTransforms[0].formattedConstant,
      payload,
    },
  );

  propCheckedPayloadCreator(functionSchema, funcSpy)(
    {
      type: mockTransforms[0].formattedConstant,
      payload,
    },
  );

  it('should return a function that takes a payload', () => {
    propCheckedPayloadCreator(objectSchema).length.should.equal(1);
  });

  it('should throw an error when the payload does not match stated type', () => {
    // eslint-disable-next-line no-unused-expressions
    objectSpy.calledOnce.should.be.ok;
  });

  it('should work when propChecker is given a function instead of an object', () => {
    // eslint-disable-next-line no-unused-expressions
    funcSpy.calledOnce.should.be.ok;
  });

  describe('errorMessage', () => {
    it('contains the problematic attribute', () => {
      // objectSpy.should.have.been.calledWith.contain('name');
      // funcSpy.should.contain('name');
    });

    it('contains the name of the action', () => {
      // objectSpy.should.contain('mock/MOCK_ONE');
      // funcSpy.should.contain('mock/MOCK_ONE');
    });
  });
});
