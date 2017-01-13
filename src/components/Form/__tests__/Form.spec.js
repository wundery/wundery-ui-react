import React from 'react';
import { mount } from 'enzyme';

import { Form, FormItem } from '../../../../src';

describe('<Form />', () => {
  let mounted = null;
  let props = null;
  let formItems = [];

  beforeEach(() => {
    props = {};

    mounted = mount(
      <Form {...props}>
        <h1>Signup</h1>
        <fieldset>
          <FormItem name="email" type="text" />
          {/* It should be able to handle also null and undefined elements
            and arrays  */}
          {null}
          {undefined}
          {[null, null]}
          {[]}
          <div className="nested">
            <FormItem name="password" type="password" />
          </div>
        </fieldset>
      </Form>
    );

    formItems = mounted.find('FormItem');
  });

  it('sets tabindexes automatically', () => {
    const tabIndexes = mounted.find('FormItem').map(fi => fi.prop('tabIndex'));

    expect(tabIndexes).toEqual([0, 0]);
  });

  it('passes the disabled flag', () => {
    mounted.setProps({ ...props, disabled: true });

    const passedValues = formItems.map(fi => fi.prop('disabled'));

    expect(passedValues).toEqual([true, true]);
  });

  it('sets disabled to false by default', () => {
    const passedValues = formItems.map(fi => fi.prop('disabled'));

    expect(passedValues).toEqual([false, false]);
  });


  it('passes the compact flag', () => {
    mounted.setProps({ ...props, compact: true });

    const passedValues = formItems.map(fi => fi.prop('compact'));

    expect(passedValues).toEqual([true, true]);
  });

  it('sets compact to false by default', () => {
    const passedValues = formItems.map(fi => fi.prop('compact'));

    expect(passedValues).toEqual([false, false]);
  });

  it('passes the pristine flag', () => {
    mounted.setProps({ ...props, pristine: false });

    const passedValues = formItems.map(fi => fi.prop('pristine'));

    expect(passedValues).toEqual([false, false]);
  });

  it('sets pristine to true by default', () => {
    const passedValues = formItems.map(fi => fi.prop('pristine'));

    expect(passedValues).toEqual([true, true]);
  });

  it('passes the requiredText prop', () => {
    mounted.setProps({ ...props, requiredText: 'Gimme dem input' });

    const passedValues = formItems.map(fi => fi.prop('requiredText'));

    expect(passedValues).toEqual([
      'Gimme dem input',
      'Gimme dem input',
    ]);
  });

  it('distributes the errors correctly to the form items', () => {
    const emailErrors = [
      { field: 'email', message: 'Email too short' },
      { field: 'email', message: 'Email invalid' },
    ];
    const passwordErrors = [
      { field: 'password', message: 'Password not good' },
    ];
    const errors = emailErrors.concat(passwordErrors);

    mounted.setProps({ ...props, errors });

    const emailField = mounted.find('FormItem').at(0);
    const passwordField = mounted.find('FormItem').at(1);

    expect(emailField.prop('errors')).toEqual(emailErrors);
    expect(passwordField.prop('errors')).toEqual(passwordErrors);
  });

  describe('onChange', () => {
    let onChange = null;
    let data = null;

    beforeEach(() => {
      onChange = jest.fn(() => true);
      data = { foo: 'bar' };

      mounted.setProps({ ...props, onChange, data });

      const passedOnChange = mounted.find('FormItem').at(0).prop('onChange');

      passedOnChange(1337);
    });

    it('it passes a wrapped onChange', () => {
      expect(onChange.mock.calls[0]).toEqual([{ email: 1337, foo: 'bar' }]);
    });

    it('does not change the data reference', () => {
      expect(data).not.toEqual({ email: 1337, foo: 'bar' });
    });
  });
});
