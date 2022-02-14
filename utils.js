// to avoit the many request to the api every time we type a letter
// we're going to delay the request
const debounce = (func, delay = 1000) => {
  // here we are going to assign the setTimeout ID to the variable timeoutId
  let timeoutId;
  //   1st time, timeoutId is false, so setTimeout run
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args); // apply method allow us to take all the args
    }, delay);
  };
};
