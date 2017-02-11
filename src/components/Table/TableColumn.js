import React from 'react';

const TableColumn = () => {};

TableColumn.propTypes = {
  attribute: React.PropTypes.string,
  bold: React.PropTypes.bool,
  builder: React.PropTypes.func,
  center: React.PropTypes.bool,
  copyable: React.PropTypes.bool,
  formatter: React.PropTypes.shape({ format: React.PropTypes.func.isRequired }),
  icon: React.PropTypes.string,
  onSort: React.PropTypes.func,
  orderHandle: React.PropTypes.bool,
  right: React.PropTypes.bool,
  expander: React.PropTypes.bool,
  title: React.PropTypes.node,
  width: React.PropTypes.number,

  /**
   * If specified, makes the cells in this column inline editable. This callback is called
   * on edit commit.
   * If no `editable` prop is defined, the stringified cell content is used as
   * editable value.
   *
   * @type {function}
   */
  onEdit: React.PropTypes.func,

  /**
   * If this is specified, it is used as key to fetch the editable value.
   *
   * @type {string}
   */
  editable: React.PropTypes.string,
};

TableColumn.defaultProps = {
  expander: false,
};

export default TableColumn;
