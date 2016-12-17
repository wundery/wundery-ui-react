import React from 'react';
import classnames from 'classnames';
import { isEmpty } from 'lodash';
import { Icon } from '../Icon';

const TimelineItem = props => (
  <div
    className={classnames('ui-timeline-item', {
      'ui-timeline-item-highlighted': props.highlighted,
    })}
  >
    <div className={classnames('ui-timeline-line')} />
    {props.icon ? (<div className={classnames('ui-timeline-item-icon')}>
      <Icon name={props.icon} />
    </div>) : null}
    <div className={classnames('ui-timeline-item-content')}>
      {props.title ? (<div className={classnames('ui-timeline-item-title')}>
        {props.title}
      </div>) : null}
      {props.date ? (<div className={classnames('ui-timeline-item-date')}>
        {props.date}
      </div>) : null}
      {!isEmpty(props.description) ? (
        <div className={classnames('ui-timeline-item-description')}>
          {props.description}
        </div>) : null}
    </div>
  </div>
);

TimelineItem.propTypes = {
  title: React.PropTypes.string,
  date: React.PropTypes.string,
  description: React.PropTypes.string,
  icon: React.PropTypes.string,
  highlighted: React.PropTypes.bool,
};

export default TimelineItem;
