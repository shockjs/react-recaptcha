jest.dontMock('../src/index');

import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
const Recaptcha = require('../src/index').default;

describe('Recaptcha Test', () => {
  it('should exists', () => {
    // Render into document
    let recaptcha = ReactTestUtils.renderIntoDocument(<Recaptcha sitekey="123456789" type="" />);
    expect(ReactTestUtils.isCompositeComponent(recaptcha)).toBeTruthy();
  });
});
