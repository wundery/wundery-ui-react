const hasParentTheClass = (element, classname) => {
  if (element.className
    && element.className.split(' ').indexOf(classname) >= 0) {
    return true;
  }

  return element.parentNode
    && hasParentTheClass(element.parentNode, classname);
};

export default hasParentTheClass;
