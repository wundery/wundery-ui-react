import React from 'react';

// Utils
import classnames from 'classnames';

const Card = props => (
  <div className={classnames('ui-card')}>
    {props.children}
  </div>
);

Card.propTypes = {
  children: React.PropTypes.node,
};

export default Card;
