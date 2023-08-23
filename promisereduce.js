var fn1 = () => {
  console.log("fn1");
  return Promise.resolve(1);
};
var fn2 = () =>
  new Promise((resolve) => {
      console.log("fn2");
      setTimeout(() => resolve(2), 1000);
  });
function promiseReduce(asyncFunctions, reduce, initialValue) {
  return new Promise ((resolve) => {
      let Accumulator = initialValue
      asyncFunctions.reduce((prevPromise, currentFunc, index) =>
        Promise.resolve(prevPromise).then(val => {
            if (index !== 0) {
              Accumulator = reduce(Accumulator, val)
            }
            return currentFunc()
        })
      , initialValue).then(val => {
        resolve(reduce(Accumulator, val))
      })
  })
}
promiseReduce(
  [fn1, fn2],
  function (memo, value) {
      console.log("reduce");

      return memo * value;
  },
  1
).then(console.log);