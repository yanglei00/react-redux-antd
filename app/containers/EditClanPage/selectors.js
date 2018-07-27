/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';


const selectEditClan = (state) => state.get('editClan');


const makeSelectPictureUrl= () => createSelector(
  selectEditClan,
  (state) => state.get('pictureUrl')
);
const makeSelectSlogan= () => createSelector(
  selectEditClan,
  (state) => state.get('slogan')
);
const makeSelectIntroduce= () => createSelector(
  selectEditClan,
  (state) => state.get('introduce')
);
export {

  makeSelectPictureUrl,
  makeSelectSlogan,
  makeSelectIntroduce
};
