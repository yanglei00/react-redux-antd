/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';


const selectClanMien = (state) => state.get('myCamTeam');

const makeSelectInitData= () => createSelector(
  selectClanMien,
  (myCamTeamState) => myCamTeamState.get('initData')
);
const makeSelectNumData= () => createSelector(
  selectClanMien,
  (myCamTeamState) => myCamTeamState.get('workNumData')
);
const makeSelectMyData=()=> createSelector(
  selectClanMien,
  (myCamTeamState) => myCamTeamState.get('myDetailData')
)

export {
  makeSelectInitData,
  makeSelectNumData,
  makeSelectMyData,
};
