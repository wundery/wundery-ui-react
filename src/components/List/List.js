import React from 'react';
import classnames from 'classnames';

function List({ children, title, embedded, inline, className }) {
  return (
    <div className={classnames('ui-list', { 'ui-list-embedded': embedded }, className)}>
      {title && <div className="ui-list-title">{title}</div>}
      <div className={classnames('ui-list-children', {'ui-inline-list': inline })}>
        {children}
      </div>
    </div>
  );
}

List.propTypes = {
  children: React.PropTypes.node,
  title: React.PropTypes.string,
  embedded: React.PropTypes.bool,
  inline: React.PropTypes.bool,
  className: React.PropTypes.string
};

export default List;
