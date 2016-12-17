// Checks whether a given value is a Promise
const isPromise = (value) => {
  if (value !== null && typeof value === 'object') {
    return value && typeof value.then === 'function';
  }

  return false;
};

export default isPromise;
