import React from 'react';
import { ListItem } from '../List';
import { Flex, FlexItem } from '../Flex';

function FormOptionListItem({ children, value, onChange, defaultChecked, checkbox, name }) {
  const onSelect = () => {
    if (checkbox) {
      // Invert the current value
      onChange({ [value]: !defaultChecked });
    } else {
      onChange(value);
    }
  };

  const wrappedOnChange = (event) => {
    if (checkbox) {
      onChange({ [value]: event.target.checked });
    } else {
      onChange(value);
    }
  };

  function renderInput() {
    if (checkbox) {
      return (
        <input
          type="checkbox"
          onChange={wrappedOnChange}
          value={value}
          checked={defaultChecked}
        />
      );
    }

    return (
      <input
        type="radio"
        value={value}
        name={name}
        onChange={wrappedOnChange}
        checked={defaultChecked}
      />
    );
  }

  return (
    <ListItem onClick={onSelect}>
      <Flex noPadding noWrap>
        <FlexItem width={40}>
          {renderInput()}
        </FlexItem>
        <FlexItem grow>
          {children}
        </FlexItem>
      </Flex>
    </ListItem>
  );
}

FormOptionListItem.propTypes = {
  children: React.PropTypes.node,
  value: React.PropTypes.string.isRequired,
  name: React.PropTypes.string,
  onChange: React.PropTypes.func,
  defaultChecked: React.PropTypes.bool.isRequired,
  checkbox: React.PropTypes.bool,
};

FormOptionListItem.defaultProps = {
  defaultChecked: false,
};

export default FormOptionListItem;
