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

import { UPLOADCLANIMAGES_FETCH_SUCCESS } from './constants';

// The initial state of the App
const initialState = fromJS({
  initData: {},
  imagesUrls: false,
});

function editClanInfoReducer(state = initialState, action) {
  console.log(action)
  switch (action.type) {
    case UPLOADCLANIMAGES_FETCH_SUCCESS:
      return state.set('imagesUrls', action.repos);
    default:
      return state;
  }
}

export default editClanInfoReducer;
