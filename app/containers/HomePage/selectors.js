/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';


const selectHome = (state) => state.get('home');

const makeSelectInitData= () => createSelector(
  selectHome,
  (state) => state.get('initData')
);

export {
  makeSelectInitData,
};
