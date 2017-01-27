import React from 'react';
import classnames from 'classnames';
import { Icon } from '../Icon';

class TreeItem extends React.Component {
  static propTypes = {
    label: React.PropTypes.string.isRequired,
    depth: React.PropTypes.number.isRequired,
    expanded: React.PropTypes.bool.isRequired,
    childs: React.PropTypes.array.isRequired,
    onClick: React.PropTypes.func.isRequired,
    node: React.PropTypes.object.isRequired,
    levelPrefix: React.PropTypes.func,
    maxDepth: React.PropTypes.number,
    itemAddon: React.PropTypes.func,
    highlighted: React.PropTypes.func,
  };

  static defaultProps = {
    levelPrefix: null,
    maxDepth: null,
    itemAddon: null,
    highlighted: null,
  };

  constructor(props) {
    super(props);

    const { expanded } = props;

    this.state = {
      expanded,
    };
  }

  render() {
    const {
      childs,
      depth,
      highlighted,
      itemAddon,
      label,
      levelPrefix,
      maxDepth,
      node,
      onClick,
    } = this.props;
    const { expanded } = this.state;

    function iconName() {
      if (expanded) { return 'minus-square-o'; }

      return 'plus-square';
    }

    const onExpandClick = () => {
      this.setState(state => ({ expanded: !state.expanded }));
    };

    function renderPrefix() {
      if (maxDepth && maxDepth === depth) { return null; }

      return (
        <a className="ui-tree-item-prefix" onClick={onExpandClick} tabIndex={0}>
          <Icon name={iconName()} />
        </a>
      );
    }

    const onClickWrapper = () => {
      onClick(node);
    };

    const renderAddon = () => {
      if (itemAddon) {
        const renderedAddon = itemAddon(node, depth);
        return renderedAddon && (
          <div className="ui-tree-item-details-addon">
            {renderedAddon}
          </div>
        );
      }

      return null;
    };

    const renderBox = () => {
      const className = classnames('ui-tree-item-box', {
        'ui-tree-item-box-clickable': onClick,
      });

      return (
        <a className={className} tabIndex={0} onClick={onClickWrapper}>
          {label}
        </a>
      );
    };

    const renderChild = (_node, index) => (
      <TreeItem
        label={_node.label}
        depth={_node.depth}
        expanded={false}
        key={index}
        childs={_node.childs}
        onClick={onClick}
        node={_node}
        levelPrefix={levelPrefix}
        maxDepth={maxDepth}
        itemAddon={itemAddon}
        highlighted={highlighted}
      />
    );

    const renderChilds = () => {
      if (expanded) {
        return (
          <div>
            <div className="ui-tree-item-indent">
              {levelPrefix && levelPrefix(node, depth + 1)}
            </div>
            <div className="ui-tree-item-childs">
              {childs.map(renderChild)}
            </div>
          </div>
        );
      }

      return null;
    };

    const className = classnames('ui-tree-item', {
      'ui-tree-item-expandable': true,
      'ui-tree-item-indent': depth > 0,
      'ui-tree-item-with-addon': itemAddon,
      'ui-tree-item-highlighted': highlighted && highlighted(node),
    });

    return (
      <div className={className}>
        <div className="ui-tree-item-details">
          <div className="ui-tree-item-details-inner">
            {renderPrefix()}
            {renderBox()}
          </div>
          {renderAddon()}
        </div>
        <div className="ui-tree-item-childs">
          {renderChilds()}
        </div>
      </div>
    );
  }
}

export default TreeItem;
