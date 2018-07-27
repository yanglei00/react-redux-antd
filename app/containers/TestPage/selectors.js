/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';


// const selectTest = (state) => {
//   console.log(state)
//   return state.get('test')
// };

const selectTest = (state) => state.get('test');
const selectHome = (state) => state.get('home');
// const makeSelectUsername = () => createSelector(
//   selectHome,
//   (homeState) => homeState.get('username')
// );

const makeSelectCount= () => createSelector(
  selectTest,
  (testState) => testState.get('count')
);
const makeSelectInitData= () => createSelector(
  selectTest,
  (testState) => testState.get('initData')
);
const makeSelectHome= () => createSelector(
  selectHome,
  (homeState) => homeSate.get('username')
);
export {
  homeTest,
  selectTest,
  makeSelectCount,
  makeSelectInitData,
  makeSelectHome
};
