/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';


// const selectTest = (state) => {
//   console.log(state)
//   return state.get('test')
// };

const selectGuessOrder = (state) => state.get('guessOrder');

const makeSelectInitData= () => createSelector(
  selectGuessOrder,
  (selectGuessOrder) => selectGuessOrder.get('initData')
);

export {
  makeSelectInitData,
};
