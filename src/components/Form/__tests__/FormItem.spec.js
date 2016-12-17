import React from 'react';
import { mount } from 'enzyme';

import { FormItem } from '../../../../src';

const inputElementSelectorByType = (type) => {
  switch (type) {
    case 'text':
    case 'password':
    case 'checkbox':
      return `input[type="${type}"]`;

    case 'select':
      return 'select';

    case 'textarea':
      return 'textarea';

    default:
      throw new Error(`Type ${type} not handled`);
  }
};

describe('<FormItem />', () => {
  let mounted = null;
  let props = null;
  let onChange = null;
  let input = null;

  ['text', 'password', 'select', 'textarea', 'checkbox'].forEach((type) => {
    const inputSelector = inputElementSelectorByType(type);

    describe(`markup for type ${type}`, () => {
      beforeEach(() => {
        onChange = jest.fn();
        props = {
          type,
          name: 'mops',
          onChange,
        };

        mounted = mount(
          <FormItem {...props} />
        );

        input = mounted.find(inputSelector).at(0);
      });

      it('sets the correct value', () => {
        if (type === 'checkbox') {
          mounted.setProps({ ...props, value: true });
          expect(input.prop('checked')).toEqual(true);
        } else if (type === 'select') {
          mounted.setProps({ ...props, value: 1337 });
          expect(input.prop('defaultValue')).toEqual(1337);
        } else {
          mounted.setProps({ ...props, value: '1337' });
          expect(input.prop('value')).toEqual('1337');
        }
      });

      it('sets an empty string as value when the value is null', () => {
        if (['text', 'password', 'textarea'].includes(type)) {
          mounted.setProps({ ...props, value: null });
          expect(input.prop('value')).toEqual('');
        }
      });

      it('passes the disabled flag', () => {
        mounted.setProps({ ...props, disabled: true });

        expect(input.prop('disabled')).toEqual(true);
      });

      it('sets disabled to false by default', () => {
        expect(input.prop('disabled')).toEqual(false);
      });

      it('calls onChange with the correct parameters', () => {
        const event = { target: { value: 1337, checked: true } };

        input.simulate('change', event);

        if (type === 'checkbox') {
          expect(onChange.mock.calls[0]).toEqual([true]);
        } else {
          expect(onChange.mock.calls[0]).toEqual([1337]);
        }
      });
    });
  });
});
