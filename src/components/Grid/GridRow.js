import React from 'react';

// Utils
import classnames from 'classnames';

// Decorators
import { spaceable } from '../../decorators';

const GridRow = (props) => {
  const children = props.children;
  const { flex } = props;
  const classes = [];

  classes.push('row');

  if (flex) {
    classes.push('ui-flex-gird')
  }

  return (
    <div className={classnames(classes)}>
      {children}
    </div>
  );
};

GridRow.propTypes = {
  children: React.PropTypes.node,
  flex: React.PropTypes.bool,
};

export default spaceable(GridRow);
