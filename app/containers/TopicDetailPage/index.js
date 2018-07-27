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
import {INIT_FETCH, WORKNUM_FETCH,SUBMITCOMMENTS_FETCH, SETCOMMENTPRAISE_FETCH} from './constants';
import { loadRepos } from '../App/actions';
import { changeCount, initFetch } from './actions';
import { makeSelectInitData, makeSelectIspraise, makeSelectNumData, makeSelectMyData, makeSelectSubmitComment,makeSelectInsetBefore, makeSelectSetCommentPraise} from './selectors';
import reducer from './reducer';
import saga from './saga';

import TopicDetailPage from './TopicDetailPage';

const mapDispatchToProps = (dispatch) => ({
  initFetch: (storyId)=>{
    dispatch(loadRepos(INIT_FETCH,{storyId}))
  },
  initMyWorkNum: (storyId)=>{
    dispatch(loadRepos(WORKNUM_FETCH, {storyId}))
  },
  submitCommentsFetch: (params)=>{
    dispatch(loadRepos(SUBMITCOMMENTS_FETCH, params));
  },
  setCommentPraise: (params)=>{
    dispatch(loadRepos(SETCOMMENTPRAISE_FETCH, params));
  }
});

const mapStateToProps = createStructuredSelector({
  initData: makeSelectInitData(),
  ispraise:makeSelectIspraise(),
  workNumData: makeSelectNumData(),
  myDetailData: makeSelectMyData(),
  submitComment: makeSelectSubmitComment(),
  insetBefore: makeSelectInsetBefore(),
  isCommentPraise: makeSelectSetCommentPraise()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'topicDetail', reducer });
const withSaga = injectSaga({ key: 'topicDetail', saga });

export default compose(withReducer,withSaga, withConnect)(TopicDetailPage);
export { mapDispatchToProps };

