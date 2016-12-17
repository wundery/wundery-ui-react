import React from 'react';
import classnames from 'classnames';

const Timeline = props => (
  <div className={classnames('ui-timeline')}>
    {props.children}
  </div>
);

Timeline.propTypes = {
  children: React.PropTypes.node,
};

export default Timeline;
