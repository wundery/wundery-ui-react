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
  title: React.PropTypes.node,
  width: React.PropTypes.number,
};

export default TableColumn;
