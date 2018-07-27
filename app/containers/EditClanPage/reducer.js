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

import { INIT_FETCH, UPLOADCLANAVATAR_FETCH_SUCCESS, ANDROIDUPLOADCLANAVATAR_FETCH_SUCCESS } from './constants';


// The initial state of the App
const initialState = fromJS({
  initData: {},
  pictureUrl: '',
  slogan: '',
  introduce: '',
});

function editClanReducer(state = initialState, action) {
  console.log(action)
  switch (action.type) {
    case INIT_FETCH:
      return state.set('pictureUrl', action.params.pictureUrl)
                  .set('slogan', action.params.slogan)
                  .set('introduce', action.params.introduce);
    case UPLOADCLANAVATAR_FETCH_SUCCESS:
      return state.set('pictureUrl', action.repos);
    case ANDROIDUPLOADCLANAVATAR_FETCH_SUCCESS:
      return state.set('pictureUrl', action.params.url);
    default:
      return state;
  }
}

export default editClanReducer;
