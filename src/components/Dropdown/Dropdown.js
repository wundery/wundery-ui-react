import React, { Component } from 'react';
import classnames from 'classnames';
import { merge } from '../../utils';
import { DropdownItem } from '../Dropdown';

class Dropdown extends Component {

  render() {
    return (
      <div
        ref={(ref) => {
          this.dropdownRef = ref;
        }}
        className={classnames('ui-dropdown', {
          'ui-dropdown-open': this.props.open,
          'ui-dropdown-left': this.props.left,
        })}
      >
        <div className={classnames('ui-dropdown-items')}>
          {[].concat(this.props.children).map((child, i) => (
            <DropdownItem
              key={i} {...merge(child.props, {
                focussed: i === this.props.focussedIndex,
                onClick: () => {
                  if (this.props.onItemClick) {
                    this.props.onItemClick();
                  }
                  return child.props.onClick();
                },
              })}
            />
            )
          )}
        </div>
      </div>
    );
  }
}

Dropdown.propTypes = {
  children: React.PropTypes.node,
  open: React.PropTypes.bool,
  onItemClick: React.PropTypes.func,
  left: React.PropTypes.bool,
  focussedIndex: React.PropTypes.number,
};

Dropdown.defaultProps = {
};

export default Dropdown;
