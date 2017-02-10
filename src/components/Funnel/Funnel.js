import React from 'react';
import classnames from 'classnames';
import { spacable } from '../../hocs';

function Funnel({ children, style }) {
  const className = classnames('ui-funnel');
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}

Funnel.propTypes = {
  children: React.PropTypes.node,
  style: React.PropTypes.object,
};

Funnel.defaultProps = {
  children: null,
  style: null,
};

export default spacable(Funnel);
