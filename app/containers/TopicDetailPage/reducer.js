/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';

import { INIT_FETCH_SUCCESS, WORKNUM_FETCH_SUCCESS, SUBMITCOMMENTS_FETCH_SUCCESS, SETCOMMENTPRAISE_FETCH_SUCCESS } from './constants';

// The initial state of the App
const initialState = fromJS({
  submitComment: false,
  initData: {},
  ispraise:false,
  workNumData: {},
  insetBefore: [],
  isCommentPraise: false,
});

function clanMienReducer(state = initialState, action) {
  console.log(action)
  switch (action.type) {
    case INIT_FETCH_SUCCESS:
      return state.set('initData', action.repos)
                  .set('ispraise',action.repos.isPraise);
    case WORKNUM_FETCH_SUCCESS:
      return state.set('submitComment', true)
                  .set('insetBefore', [
                    action.repos
                  ]);
    case SUBMITCOMMENTS_FETCH_SUCCESS:
    if(state.get('ispraise')==0){
      return state.set('ispraise', true);
    }else{
      return state.set('ispraise', false);
    }
      // return state.set('isCommentPraise', true);
    case SETCOMMENTPRAISE_FETCH_SUCCESS:
      return state.set('isCommentPraise', action.repos);
    default:
      return state;
  }
}

export default clanMienReducer;
