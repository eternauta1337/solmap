const ReducerUtils = {

  logState(tag, state) {
    console.log(`REDUCER(${tag})`, state);
  },

  logAction(action) {
    console.log(`ACTION =================================> `, action)
  }
}

module.exports = ReducerUtils
