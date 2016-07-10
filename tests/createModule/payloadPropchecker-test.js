import { PropTypes } from 'react';
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
  let warning = false;

  const propCheckedPayloadCreator = payloadPropchecker(
    { name: PropTypes.string.isRequired },
    {
      onError: err => {
        // eslint-disable-next-line no-console
        console.error('PROP CHECKER', err);
        warning = err;
      },
    }
  );

  propCheckedPayloadCreator({ type: mockTransforms[0].formattedConstant, payload });

  it('should return a function that takes a payload', () => {
    propCheckedPayloadCreator.length.should.equal(1);
  });

  it('should throw an error when the payload does not match stated type', () => {
    warning.should.not.equal(false);
  });

  describe('errorMessage', () => {
    it('contains the problematic attribute', () => {
      warning.should.contain('name');
    });

    it('contains the name of the action', () => {
      warning.should.contain('mock/MOCK_ONE');
    });
  });
});
