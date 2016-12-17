import React from 'react';

// Utils
import classnames from 'classnames';

// Decorators
import { spaceable } from '../../decorators';

const GridRow = (props) => {
  const children = props.children;

  return (
    <div className={classnames('row')}>
      {children}
    </div>
  );
};

GridRow.propTypes = {
  children: React.PropTypes.node,
};

export default spaceable(GridRow);
