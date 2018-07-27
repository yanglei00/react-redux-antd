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
import { VOTE_FETCH} from './constants';
import { loadRepos } from '../App/actions';
import {  } from './actions';
import { makeSelectInitData} from './selectors';
import reducer from './reducer';
import saga from './saga';

import ClanListPage from './ClanListPage';

const mapDispatchToProps = (dispatch) => ({
  voteFetch: (params, callback) => {
    return dispatch(loadRepos(VOTE_FETCH, {clanId: params, callback}))
  },
});

const mapStateToProps = createStructuredSelector({
  initData: makeSelectInitData(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'clanList', reducer });
const withSaga = injectSaga({ key: 'clanList', saga });

export default compose(withReducer,withSaga, withConnect)(ClanListPage);
export { mapDispatchToProps };

