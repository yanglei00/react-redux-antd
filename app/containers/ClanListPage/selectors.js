/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectClanList = (state) => state.get('clanList');


const makeSelectInitData= () => createSelector(
  selectClanList,
  (state) => state.get('initData')
);
const makeSelectVoteSuccess= () => createSelector(
  selectClanList,
  (state) => state.get('voteSuccess')
);
export {
  makeSelectInitData,
  makeSelectVoteSuccess
};
