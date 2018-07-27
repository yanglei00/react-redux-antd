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
import {SUBMITCLANINFO_FETCH, UPLOADCLANAVATAR_FETCH,} from './constants';
import { loadRepos } from '../App/actions';
import { initFetch , androidUploadClanAvatar} from './actions';
import { makeSelectPictureUrl, makeSelectSlogan, makeSelectIntroduce } from './selectors';
import reducer from './reducer';
import saga from './saga';

import EditClanPage from './EditClanPage';

const mapDispatchToProps = (dispatch) => ({
  initFetch: (params)=>{
    return dispatch(initFetch(params))
  },
  uploadClanAvatar: (fileName) => {
    return dispatch(loadRepos(UPLOADCLANAVATAR_FETCH,{fileName}))
  },
  androidUploadClanAvatar: (url)=>{
    return dispatch(androidUploadClanAvatar({url}))
  },
  submitClanInfo: ()=>{
    return dispatch(loadRepos(SUBMITCLANINFO_FETCH))
  },
});

const mapStateToProps = createStructuredSelector({
  pictureUrl: makeSelectPictureUrl(),
  slogan: makeSelectSlogan(),
  introduce: makeSelectIntroduce()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'editClan', reducer });
const withSaga = injectSaga({ key: 'editClan', saga });

export default compose(withReducer,withSaga, withConnect)(EditClanPage);
export { mapDispatchToProps };

