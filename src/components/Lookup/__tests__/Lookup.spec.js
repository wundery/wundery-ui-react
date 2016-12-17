import React from 'react';
import { mount } from 'enzyme';
import { Lookup, DropdownItem } from '../../../../src';

describe('<Lookup />', () => {
  let mounted = null;
  let props = null;
  let onLoad = null;
  let itemBuilder = null;

  beforeEach(() => {
    onLoad = jest.fn(userInput => Promise.resolve(userInput ? [1337, 42] : []));

    itemBuilder = (result, key) => (
      <DropdownItem
        key={key}
        title={result}
        body={<span className="lookup-result">{result}</span>}
      />
    );

    props = {
      onLoad,
      itemBuilder,
      onSelect: jest.fn(),
    };

    mounted = mount(
      <Lookup {...props} />
    );
  });

  it('renders a text input', () => {
    expect(mounted.find('FormItem').length).toEqual(1);
  });

  it('does not call onLoad without text change', () => {
    expect(onLoad.mock.calls.length).toEqual(0);
  });

  it('does not render any lookup results without text change', () => {
    expect(mounted.find('.lookup-result').length).toEqual(0);
  });

  describe('when the input changes', () => {
    beforeEach(() => {
      const changeEvent = { target: { value: 'Hello' } };

      mounted.find('FormItem input').at(0).simulate('change', changeEvent);
    });

    it('calls the provided onLoad when the input value changes', () => {
      expect(onLoad.mock.calls.length).toEqual(1);
      expect(onLoad.mock.calls[0]).toEqual(['Hello']);
    });

    it('renders lookup results', () => {
      onLoad()
        .then(() => {
          expect(mounted.find('.lookup-result').length).toEqual(2);
        })
        .catch(() => {});
    });

    it('emptys the dropdown when the value changes back to empty', () => {
      const changeEvent = { target: { value: '' } };

      mounted.find('FormItem input').at(0).simulate('change', changeEvent);
      expect(mounted.find('.lookup-result').length).toEqual(0);
    });
  });
});
