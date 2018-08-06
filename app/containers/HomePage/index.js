import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  // makeSelectRepos,
  // makeSelectLoading,
  // makeSelectError,
} from 'containers/App/selectors';
import {INIT_FETCH, SUBMITCOMMENTS_FETCH, VOTE_FETCH} from './constants';
import { loadRepos, loginSuccess } from '../App/actions';
import { changeCount, initFetch } from './actions';
import { makeSelectInitData, makeSelectSubmitComment, makeSelectInsetBefore} from './selectors';
import reducer from './reducer';
import saga from './saga';

import HomePage from './HomePage';

const mapDispatchToProps = (dispatch) => ({
  initFetch: (clanId)=>{
    dispatch(loadRepos(INIT_FETCH, {clanId}))
  },
});

const mapStateToProps = createStructuredSelector({
  initData: makeSelectInitData(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(withReducer,withSaga, withConnect)(HomePage);
export { mapDispatchToProps };
