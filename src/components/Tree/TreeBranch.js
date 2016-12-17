import React from 'react';
import classnames from 'classnames';

const TreeBranch = (props) => {
  let elements = null;
  if (props.depth === 1) {
    elements = <span className="ui-tree-branch-connected" />;
  }
  if (props.depth === 2) {
    elements = [
      <span className="ui-tree-branch" key="1" />,
      <span className="ui-tree-branch-connected" key="2" />,
    ];
  }
  return (
    <span className={classnames('ui-tree')}>
      {elements}
    </span>
  );
};

TreeBranch.propTypes = {
  depth: React.PropTypes.number.isRequired,
};

TreeBranch.defaultProps = {
  depth: 0,
};

export default TreeBranch;
