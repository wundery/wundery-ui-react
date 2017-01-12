/**
 * Recursively transform an array of objects to a data structure compatible with the tree
 * Also outputs a mapping from tree data to real data
 * the following minimal structure has to be adhered to in order for the tree to work:
 * [
 *   {
 *     id: 'uuid',
 *     title: 'title',
 *     children: []
 *   }
 * ]
 * @param {Array} data      a single node from the tree
 * @param {Object} config   configuration object
 * @return {Array}         [tree, mapping]
*/
function dataToTree(data, { maxDepth, name }) {
  /**
   * Constructs a leaf's path
   * @param  {Object} parent Parent object
   * @return {Array}         Path array
   */
  function joinParentPath(parent, id) {
    if (parent && parent.data) {
      const path = parent.data.path;
      return [...path, id];
    }

    return [id];
  }

  /**
   * Transforms an array of objects to tree nodes
   * @param  {Array} items           Array of items
   * @param  {Object} [parent=null]  Parent node
   * @return {Array}                Array of tree nodes (root.children)
   */
  function transformItems(items, mapping, parent = null) {
    if (items.length < 1) { return []; }

    /**
     * Transforms a single object to a result
     * @param  {Object} item     data item to be transformed into
     * @param  {Number} position index of the category in the parent category
     * @return {Object}          tree node
     */
    function transformItem(item, position) {
      const children = item.children;
      const title = item.title;
      const id = item.id;

      const level = parent.data.level + 1;

      const result = {
        module: title,
        leaf: level >= maxDepth,
        collapsed: level >= 2 || position > 10 ? true : null,
        data: {
          id,
          level,
          parent,
          path: joinParentPath(parent, id),
          position,
        },
      };

      result.children = children.length > 0 ? transformItems(children, mapping, result) : [];
      mapping.set(result.data.path.join('.'), item);

      return result;
    }

    return items.map(transformItem);
  }

  // Root object for the map
  const rootObj = { id: 'root' };

  // root object passed of the tree tree
  const treeRoot = {
    data: {
      id: rootObj.id,
      path: [rootObj.id],
      level: 0,
    },
  };

  const mapping = new Map();
  mapping.set('root', rootObj);

  const tree = {
    ...treeRoot,
    module: name,
    collapsed: false,
    children: transformItems(data, mapping, treeRoot),
  };

  return [
    tree,
    mapping,
  ];
}

export default dataToTree;
