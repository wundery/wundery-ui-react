import React from 'react';
import classnames from 'classnames';

function InlineList({ block, children, center }) {
  const className = classnames('ui-inline-list', {
    'ui-inline-list-block': block,
    'ui-inline-list-center': center,
  });

  return (
    <div className={className}>
      {[].concat(children).map((child, index) => (
        <div className="ui-inline-list-item" key={index}>
          {child}
        </div>
      ))}
    </div>
  );
}

InlineList.propTypes = {
  children: React.PropTypes.node,
  block: React.PropTypes.bool,
  center: React.PropTypes.bool
};

InlineList.defaulProps = {
  block: false,
  center: false
};

export default InlineList;
