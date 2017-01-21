import React from 'react';
import classnames from 'classnames';
import { get } from 'lodash';
import TableCell from './TableCell';

const determineCellValue = (column, datum, isHeaderRow, index) => {
  const builder = column.props.builder;
  const attribute = column.props.attribute;
  const formatter = column.props.formatter;

  let value = null;

  // If this is the header row, return the title
  if (isHeaderRow) {
    value = column.props.title;
  } else {
    // If the column has a builder func, use that
    if (builder) {
      value = builder(datum, index);
    } else if (attribute) {
        // If teh attribute is a dot-separated string,
        // find the value within the datum
      if (attribute.match(/\./)) {
        value = get(datum, attribute);
      } else {
        value = datum[attribute];
      }
    } else {
      value = null;
    }

    // If a formatter is present, apply it in the value
    if (formatter) {
      value = formatter.format(value);
    }
  }

  return value;
};

const TableRow = (props) => {
  const { onRowClick, header: isHeaderRow, datum, columns, children, addon, index } = props;

  // Is this row clickable
  const isClickable = typeof onRowClick === 'function';
  const onClick = onRowClick ? event => props.onRowClick(event, datum) : null;

  // A row can have an addon which is placed below the default content
  const rowAddon = addon ? (
    <div className={classnames('ui-table-row-addon')}>
      {props.addon}
    </div>
  ) : null;

  // Build the cells
  const cells = columns ? columns.map((column, columnIndex) => {
    const {
      bold,
      center,
      copyable,
      icon,
      onSort,
      orderHandle,
      right,
      title,
      width,
    } = column.props;

    return (
      <TableCell
        key={columnIndex}
        width={width}
        value={determineCellValue(column, datum, isHeaderRow, index)}
        copyable={copyable && !isHeaderRow}
        onSort={isHeaderRow ? onSort : null}
        bold={bold && !isHeaderRow}
        right={right}
        center={center}
        orderHandle={orderHandle}
        title={title}
        icon={isHeaderRow ? icon : null}
      />
    );
  }) : children;

  return (
    <div className={classnames('ui-table-row-wrapper')}>
      <div
        onClick={onClick}
        className={classnames('ui-table-row', {
          'ui-table-row-clickable': isClickable,
          'ui-table-row-highlighted': props.highlighted,
        })}
      >
        {cells}
      </div>
      {rowAddon}
    </div>
  );
};

TableRow.propTypes = {
  datum: React.PropTypes.object,
  columns: React.PropTypes.array,
  header: React.PropTypes.bool,
  onRowClick: React.PropTypes.func,
  highlighted: React.PropTypes.bool,
  children: React.PropTypes.node,
  addon: React.PropTypes.node,
  index: React.PropTypes.any,
};

export default TableRow;
