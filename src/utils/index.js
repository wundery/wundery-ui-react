export childValidator from './childValidator';
export hasParentTheClass from './hasParentTheClass';
export isPromise from './isPromise';
export randomString from './randomString';
export spacing from './spacing';

export function merge(base, mergeIn) {
  return ({ ...base, ...mergeIn });
}
