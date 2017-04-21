export childValidator from './childValidator';
export hasParentTheClass from './hasParentTheClass';
export isPromise from './isPromise';
export randomString from './randomString';
export spacing from './spacing';

export function merge(base, mergeIn) {
  return ({ ...base, ...mergeIn });
}

/**
 * Move utility
 */
export function move(arr, from, to) {
  const newArr = [...arr];
  newArr.splice(to, 0, newArr.splice(from, 1)[0]);
  return newArr;
}
