import React, { Component } from 'react';
import classnames from 'classnames';
import { isUndefined } from 'lodash';
import { isPromise } from '../../utils';
import { Icon } from '../Icon';
import { Copyable } from '../Copyable';

class TableCell extends Component {
  constructor() {
    super();

    this.state = {
      sorted: false,
    };
  }
  render() {
    const isCopyable = this.props.copyable;
    const value = this.props.value;
    const width = this.props.width;
    const isBold = this.props.bold;
    const setSorted = (direction) => {
      this.setState({ sorted: direction });
    };

    // If copyable and/or bold is requested, wrap the content
    const content = isCopyable ? <Copyable>{value}</Copyable> : value;
    const noContent = isUndefined(content);

    // This is a wrapper around the sepcified sort callback which
    // injects the requested direction as a parameter to the original
    // callback
    const onSort = this.props.onSort
      ? direction => () => {
        const result = this.props.onSort(direction);

        // Check if the result is a promise. If so, wait for it to be fulfilled
        // before updating the internal state.
        if (isPromise(result)) {
          result.then(() => setSorted(direction));
        } else {
          setSorted(direction);
        }
      }
      : null;

    // Build the icon if specified
    const icon = this.props.icon
      ? <Icon name={this.props.icon} noMargin={noContent} />
      : null;

    // Build the cells styles
    const styles = {
      flex: width ? `0 0 ${width}px` : null,
    };

    // If onSort is defined, a suffix should be added
    const suffix = typeof onSort === 'function'
      ? (
        <div
          className={classnames('ui-table-cell-suffix', 'ui-table-sort', {
            'ui-table-sort-asc': this.state.sorted === 1,
            'ui-table-sort-desc': this.state.sorted === -1,
          })}
        >
          <Icon name="caret-up" onClick={onSort(1)} />
          <Icon name="caret-down" onClick={onSort(-1)} />
        </div>
      )
      : null;


    return (
      <div
        className={classnames('ui-table-cell', {
          'ui-table-cell-bold': isBold,
          'ui-table-cell-right': this.props.right,
          'ui-table-cell-center': this.props.center,
          'ui-table-cell-order-handle': this.props.orderHandle,
        })}
        style={styles}
      >
        <div className={classnames('ui-table-cell-content')}>
          <span className={classnames('ui-table-cell-text')}>
            {icon}
            {content}
          </span>
          {suffix}
        </div>
      </div>
    );
  }
}

TableCell.propTypes = {
  bold: React.PropTypes.bool,
  center: React.PropTypes.bool,
  copyable: React.PropTypes.bool,
  icon: React.PropTypes.string,
  onSort: React.PropTypes.func,
  orderHandle: React.PropTypes.bool,
  right: React.PropTypes.bool,
  value: React.PropTypes.node,
  width: React.PropTypes.number,
};

export default TableCell;
