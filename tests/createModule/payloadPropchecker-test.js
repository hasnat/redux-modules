import PropTypes from 'prop-types';
import { should } from 'chai';
require('mocha-sinon');
import payloadPropchecker from '../../src/actionMiddleware/payloadPropchecker';
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

describe('payloadPropchecker', () => {
  let objectErr = false;
  let functionErr = false;

  const objectSchema = { name: PropTypes.string.isRequired };
  const functionSchema = PropTypes.shape({ name: PropTypes.string });

  const propCheckedPayloadCreator = (schema, cb) => payloadPropchecker(
    schema,
    {
      onError: err => {
        // eslint-disable-next-line no-console
        console.error('PROP CHECKER', err);
        cb(err);
      },
    }
  );

  propCheckedPayloadCreator(objectSchema, err => objectErr = err)(
    { type: mockTransforms[0].formattedConstant, payload }
  );

  propCheckedPayloadCreator(functionSchema, err => functionErr = err)(
    { type: mockTransforms[0].formattedConstant, payload }
  );

  it('should return a function that takes a payload', () => {
    propCheckedPayloadCreator.length.should.equal(1);
  });

  it('should throw an error when the payload does not match stated type', () => {
    objectErr.should.not.equal(false);
  });

  it('should work when propChecker is given a function instead of an object', () => {
    functionErr.should.not.equal(false);
  });

  describe('errorMessage', () => {
    it('contains the problematic attribute', () => {
      objectErr.should.contain('name');
      functionErr.should.contain('name');
    });

    it('contains the name of the action', () => {
      objectErr.should.contain('mock/MOCK_ONE');
      functionErr.should.contain('mock/MOCK_ONE');
    });
  });
});
