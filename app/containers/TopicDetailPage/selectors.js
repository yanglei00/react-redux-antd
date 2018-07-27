/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';


const selectClanMien = (state) => state.get('topicDetail');

const makeSelectInitData= () => createSelector(
  selectClanMien,
  (myCamTeamState) => myCamTeamState.get('initData')
);
const makeSelectIspraise= () => createSelector(
  selectClanMien,
  (myCamTeamState) => myCamTeamState.get('ispraise')
);
const makeSelectNumData= () => createSelector(
  selectClanMien,
  (myCamTeamState) => myCamTeamState.get('workNumData')
);
const makeSelectMyData=()=> createSelector(
  selectClanMien,
  (myCamTeamState) => myCamTeamState.get('myDetailData')
)
const makeSelectSubmitComment= () => createSelector(
  selectClanMien,
  (clanMienState) => clanMienState.get('submitComment')
);
const makeSelectInsetBefore= () => createSelector(
  selectClanMien,
  (clanMienState) => clanMienState.get('insetBefore')
);
const makeSelectSetCommentPraise= () => createSelector(
  selectClanMien,
  (clanMienState) => clanMienState.get('isCommentPraise')
);
export {
  makeSelectInitData,
  makeSelectIspraise,
  makeSelectNumData,
  makeSelectMyData,
  makeSelectSubmitComment,
  makeSelectInsetBefore,
  makeSelectSetCommentPraise
};
