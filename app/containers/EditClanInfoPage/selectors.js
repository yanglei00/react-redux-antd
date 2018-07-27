/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';


const selectEditClanInfo = (state) => state.get('editClanInfo');

const makeSelectImagesUrls= () => createSelector(
  selectEditClanInfo,
  (state) => state.get('imagesUrls')
);


export {
  makeSelectImagesUrls,
};
