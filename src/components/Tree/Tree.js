import React from 'react';
import TreeItem from './TreeItem';

class Tree extends React.Component {
  static propTypes = {
    // Tree data, see docs
    data: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.object,
    ]).isRequired,

    // Triggered on item click
    onItemClick: React.PropTypes.func.isRequired,

    // Rendered on each level once
    levelPrefix: React.PropTypes.func,

    // maximum tree depth
    maxDepth: React.PropTypes.number,

    // Rendered on each item
    itemAddon: React.PropTypes.func,

    // Func that returns a boolean value indicating if a node should be highlighted
    highlighted: React.PropTypes.func,
  };

  static defaultProps = {
    levelPrefix: null,
    maxDepth: null,
    highlighted: null,
  };

  constructor(props) {
    super(props);

    const { data } = props;

    this.state = {
      data,
    };
  }

  componentWillReceiveProps({ data }) {
    this.setState({ data });
  }

  renderNode = (node, index) => {
    const { onItemClick, levelPrefix, maxDepth, itemAddon, highlighted } = this.props;
    const { childs, depth, expanded, label } = node;

    return (
      <TreeItem
        label={label}
        depth={depth}
        key={index}
        expanded={expanded}
        childs={childs}
        onClick={onItemClick}
        node={node}
        levelPrefix={levelPrefix}
        maxDepth={maxDepth}
        itemAddon={itemAddon}
        highlighted={highlighted}
      />
    );
  }

  renderLevelPrefix() {
    const { levelPrefix } = this.props;

    if (levelPrefix) {
      return levelPrefix(null, 0);
    }

    return null;
  }

  render() {
    const { data } = this.state;

    const nodes = [].concat(data);

    return (
      <div className="ui-tree">
        {this.renderLevelPrefix()}
        {nodes.map(this.renderNode)}
      </div>
    );
  }
}

export default Tree;
