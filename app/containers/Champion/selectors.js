/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';


const selectChampion = (state) => state.get('champion');


const makeSelectIsShowMask= () => createSelector(
  selectChampion,
  (state) => state.get('isShowMask')
);
const makeSelectClanId= () => createSelector(
  selectChampion,
  (state) => state.get('clanId')
);
const makeSelectMyGoldAccount= () => createSelector(
  selectChampion,
  (state) => state.get('myGoldAccount')
);
export {
  makeSelectIsShowMask,
  makeSelectClanId,
  makeSelectMyGoldAccount
};
