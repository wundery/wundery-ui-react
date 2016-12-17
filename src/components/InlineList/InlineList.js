import React from 'react';

function InlineList({ children }) {
  return (
    <div className="ui-inline-list">
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
};

export default InlineList;
