import React from 'react';
import { get } from 'lodash';
import { List } from '../List';
import FormOptionListItem from './FormOptionListItem';

function filterListItems(item) {
  return item.type && item.type === FormOptionListItem;
}

function FormOptionList(props) {
  const { children, name, onChange, value, multiple, title, embedded, omitOnClick, inline, className } = props;

  const itemOnChange = (data) => {
    if (multiple) {
      onChange({ ...value, ...data });
    } else {
      onChange(data);
    }
  };

  return (
    <List title={title} embedded={embedded} inline={inline} className={className}>
      {[].concat(children).filter(filterListItems).map((child, index) => {
        const defaultChecked = multiple
          ? get(value, child.props.value) === true
          : child.props.value === value;

        const newProps = { ...child.props,
          name,
          key: index,
          defaultChecked,
          checkbox: multiple,
          onChange: itemOnChange,
          omitOnClick,
        };

        return <FormOptionListItem {...newProps} />;
      })}
    </List>
  );
}

FormOptionList.propTypes = {
  children: React.PropTypes.node,
  name: React.PropTypes.string,
  title: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired,
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object,
  ]),
  multiple: React.PropTypes.bool,
  embedded: React.PropTypes.bool,
  omitOnClick: React.PropTypes.bool,
  inline: React.PropTypes.bool,
  className: React.PropTypes.string
};

export default FormOptionList;
