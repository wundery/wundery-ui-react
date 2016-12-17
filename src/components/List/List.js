import React from 'react';
import classnames from 'classnames';

function List({ children, title, embedded }) {
  return (
    <div className={classnames('ui-list', { 'ui-list-embedded': embedded })}>
      {title && <div className="ui-list-title">{title}</div>}
      <div className="ui-list-children">
        {children}
      </div>
    </div>
  );
}

List.propTypes = {
  children: React.PropTypes.node,
  title: React.PropTypes.string,
  embedded: React.PropTypes.bool,
};

export default List;
