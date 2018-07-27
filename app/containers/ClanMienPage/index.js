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
import {INIT_FETCH, SUBMITCOMMENTS_FETCH, VOTE_FETCH} from './constants';
import { loadRepos } from '../App/actions';
import { changeCount, initFetch } from './actions';
import { makeSelectInitData, makeSelectSubmitComment, makeSelectInsetBefore} from './selectors';
import reducer from './reducer';
import saga from './saga';

import ClanMienPage from './ClanMienPage';

const mapDispatchToProps = (dispatch) => ({
  initFetch: (clanId)=>{
    dispatch(loadRepos(INIT_FETCH, {clanId}))
  },
  submitCommentsFetch: (clanId,value, isReply, commentTo, commentToCode, commentToId)=>{
    dispatch(loadRepos(SUBMITCOMMENTS_FETCH,{content: value, clanId, isReply, commentTo, commentToCode, commentToId}))
  },
  voteFetch: (clanId, callback)=>{
    dispatch(loadRepos(VOTE_FETCH,{clanId, callback}))
  }
});

const mapStateToProps = createStructuredSelector({
  initData: makeSelectInitData(),
  submitComment: makeSelectSubmitComment(),
  insetBefore: makeSelectInsetBefore()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'clanMien', reducer });
const withSaga = injectSaga({ key: 'clanMien', saga });

export default compose(withReducer,withSaga, withConnect)(ClanMienPage);
export { mapDispatchToProps };

