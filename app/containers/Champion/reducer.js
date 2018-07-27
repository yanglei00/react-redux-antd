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

import { SHOW_MASK, CLOSE_MASK , DOGUESS_FETCH_SUCCESS, GETMYGOLD_FETCH_SUCCESS} from './constants';


// The initial state of the App
const initialState = fromJS({
  initData: {},
  isShowMask: false,
  clanId: 0,
  myGoldAccount: 0,
});

function editClanReducer(state = initialState, action) {
  console.log(action)
  switch (action.type) {
    case SHOW_MASK:
      return state.set('isShowMask', true)
                  .set('clanId', action.clanId);
    case CLOSE_MASK:
      return state.set('isShowMask', false)
    case DOGUESS_FETCH_SUCCESS:
      return state.set('isShowMask', false)
    case GETMYGOLD_FETCH_SUCCESS:
      return state.set('myGoldAccount', action.repos)
    default:
      return state;
  }
}

export default editClanReducer;
