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
import {INIT_FETCH, WORKNUM_FETCH} from './constants';
import { loadRepos } from '../App/actions';
import { changeCount, initFetch } from './actions';
import { makeSelectInitData, makeSelectNumData, makeSelectMyData} from './selectors';
import reducer from './reducer';
import saga from './saga';

import MyCamTeamPage from './MyCamTeamPage';

const mapDispatchToProps = (dispatch) => ({
  initFetch: ()=>{
    dispatch(loadRepos(INIT_FETCH))
  },
  initMyWorkNum: ()=>{
    dispatch(loadRepos(WORKNUM_FETCH))
  },
  gotoTop:()=>{
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
});

const mapStateToProps = createStructuredSelector({
  initData: makeSelectInitData(),
  workNumData: makeSelectNumData(),
  myDetailData: makeSelectMyData(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'myCamTeam', reducer });
const withSaga = injectSaga({ key: 'myCamTeam', saga });

export default compose(withReducer,withSaga, withConnect)(MyCamTeamPage);
export { mapDispatchToProps };

