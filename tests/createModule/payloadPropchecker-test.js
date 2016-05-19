import { PropTypes } from 'react';
import { expect, should } from 'chai';
require('mocha-sinon');
import { Map } from 'immutable';
import payloadPropchecker from '../../src/createModule/payloadPropchecker';
should();

const mockTransforms = [
  {
    action: 'MOCK_ONE',
    formattedConstant: 'mock/MOCK_ONE',
    payloadTypes: {
      name: PropTypes.string.isRequired,
    },
    metaTypes: {
      id: PropTypes.number.isRequired,
    },
  },
  {
    action: 'MOCK_TWO',
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

  const propCheckedPayloadCreator = payloadPropchecker(err => {
    console.error(err);
    warning = err;
  });

  const transformation = {
    actionName: mockTransforms[0].formattedConstant,
    payloadTypes: mockTransforms[0].payloadTypes,
  };

  propCheckedPayloadCreator(transformation, { payload });

  it('should return a function that takes a payload', () => {
    propCheckedPayloadCreator.length.should.equal(1);
  });

  it('should throw an error when the payload doesnt match stated type', () => {
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
