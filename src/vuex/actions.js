export const increase = function ({ dispatch, state }, ...arg) {
  dispatch('INCREAMENT', arg)
}

export const decrease = function ({ dispatch, state }, ...arg) {
  dispatch('DECREAMENT', arg)
}

export const multiply = function ({ dispatch, state }, ...arg) {
  dispatch('MULTIPLY', arg)
}

export const divide = function ({ dispatch, state }, ...arg) {
  dispatch('DIVIDE', arg)
}
