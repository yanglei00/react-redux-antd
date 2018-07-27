/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';


const selectClanMien = (state) => state.get('clanMien');

const makeSelectInitData= () => createSelector(
  selectClanMien,
  (clanMienState) => clanMienState.get('initData')
);
const makeSelectSubmitComment= () => createSelector(
  selectClanMien,
  (clanMienState) => clanMienState.get('submitComment')
);
const makeSelectInsetBefore= () => createSelector(
  selectClanMien,
  (clanMienState) => clanMienState.get('insetBefore')
);

export {
  makeSelectInitData,
  makeSelectSubmitComment,
  makeSelectInsetBefore
};
