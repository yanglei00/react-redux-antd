/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';


// const selectTest = (state) => {
//   console.log(state)
//   return state.get('test')
// };

const selectList = (state) => state.get('camList');
// const makeSelectUsername = () => createSelector(
//   selectHome,
//   (homeState) => homeState.get('username')
// );

const makeSelectInitData= () => createSelector(
  selectList,
  (testState) => testState.get('initData')
);
export {
  makeSelectInitData,
};
