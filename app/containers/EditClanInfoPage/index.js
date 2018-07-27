import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
// import {
//   makeSelectRepos,
//   makeSelectLoading,
//   makeSelectError
// } from 'containers/App/selectors';
import {RESTART_ON_REMOUNT} from 'utils/constants';
import {UPLOADCLANIMAGES_FETCH} from './constants';
import { loadRepos } from '../App/actions';
import { initFetch } from './actions';
import { makeSelectImagesUrls} from './selectors';
import reducer from './reducer';
import saga from './saga';

import EditClanInfoPage from './EditClanInfoPage';

const mapDispatchToProps = (dispatch) => ({
  uploadClanImages: (files, callback) => {
    return dispatch(loadRepos(UPLOADCLANIMAGES_FETCH,{files, callback}))
  },
});

const mapStateToProps = createStructuredSelector({
  imagesUrls: makeSelectImagesUrls(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'editClanInfo', reducer });
const withSaga = injectSaga({ key: 'editClanInfo', saga, mode: RESTART_ON_REMOUNT}); // RESTART_ON_REMOUNT 卸载组件时不移除监听

export default compose(withReducer,withSaga, withConnect)(EditClanInfoPage);
export { mapDispatchToProps };

