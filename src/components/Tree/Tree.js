import React from 'react';
import UiTree from 'react-ui-tree';
import { Spinner } from '../Spinner';
import dataToTree from './utils/dataToTree';

class Tree extends React.Component {
  static propTypes = {
    // Additional React element that will be prepended to the tree
    addon: React.PropTypes.node,
    // Expects an array of objects
    // data: React.PropTypes.array.isRequired,
    // Function that takes a node and renders it
    itemBuilder: React.PropTypes.func.isRequired,
    // Loading state
    loading: React.PropTypes.bool,
    // Max-depth of the tree
    // maxDepth: React.PropTypes.number,
    // The name of the tree
    name: React.PropTypes.string.isRequired,
    // Triggered when the tree component changes
    onChange: React.PropTypes.func.isRequired,
  }

  static defaultProps = {
    data: [],
    maxDepth: 2,
  }

  constructor(props) {
    super(props);

    this.state = this.getTreeFromProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const nextState = this.getTreeFromProps(nextProps);
    this.setState(nextState);
  }

  /**
   * Tree callback
   * @param  {Object} tree   Current tree
   * @param  {Object} parent New parent of moved node
   * @param  {Object} node   Moved node
   */
  onTreeChange = (tree, parent, node) => {
    const { onChange } = this.props;
    const { mapping } = this.state;

    const nodeObj = mapping.get(node.data.path.join('.'));
    const parentObj = mapping.get(parent.data.path.join('.'));

    const parentItems = parent.children.map(c => c.data.id);

    onChange(nodeObj, parentObj, parentItems);
  }

  /**
   * Transforms data passed into the component to a tree
   * @param {Array}   Array of data
   * @return {Object} Tree and tree -> data mapping
   */
  getTreeFromProps(nextProps) {
    const { data, maxDepth, name } = nextProps;

    const transformedData = dataToTree(data, { maxDepth, name });
    const nextTree = transformedData[0];
    const nextMapping = transformedData[1];

    return {
      tree: nextTree,
      mapping: nextMapping,
    };
  }

  /**
   * Checks if a node is collapsed
   * @param {Object} node   a single node from the tree
   * @return {Boolean}      whether a node should be collapsed
   */
  treeNodeIsCollapsed(node) {
    return node.collapsed;
  }

  /**
   * Calls props.itemBuilder with the object belonging to the current tree node
   * @param  {Object} node Tree node
   * @return {Object}      Data object
   */
  treeNodeBuilder = (node) => {
    const { itemBuilder, name } = this.props;
    const { mapping } = this.state;
    const path = node.data.path;

    const categoryObj = mapping.get(path.join('.'));
    const isRoot = categoryObj.id === 'root';

    let returning = {};

    if (isRoot) {
      returning = { ...categoryObj, title: name };
    } else {
      returning = categoryObj;
    }

    return itemBuilder(returning, isRoot);
  }

  renderTree() {
    const { tree } = this.state;

    return (
      <UiTree
        paddingLeft={20}
        isNodeCollapsed={Tree.isNodeCollapsed}
        tree={tree}
        renderNode={this.treeNodeBuilder}
        onChange={this.onTreeChange}
      />
    );
  }

  renderLoading() {
    return (<Spinner />);
  }

  render() {
    const { addon, loading } = this.props;

    return (
      <div className="tree-container">
        {addon && <div className="tree-addon">{addon}</div>}
        <div className="tree">
          {loading ? this.renderLoading() : this.renderTree()}
        </div>
      </div>
    );
  }
}

export default Tree;
