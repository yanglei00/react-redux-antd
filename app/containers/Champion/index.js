
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { GETMYGOLD_FETCH, DOGUESS_FETCH} from './constants';
import { loadRepos } from '../App/actions';
import { showMask, closeMask } from './actions';
import { makeSelectIsShowMask, makeSelectClanId, makeSelectMyGoldAccount} from './selectors';
import reducer from './reducer';
import saga from './saga';

import ChampionPage from './Champion';

const mapDispatchToProps = (dispatch) => ({
  showMask: (clanId)=>{
    dispatch(loadRepos(GETMYGOLD_FETCH))
    return dispatch(showMask(clanId))
  },
  closeMask: ()=>{
    return dispatch(closeMask())
  },
  getMyGold: ()=>{
    return dispatch(loadRepos(GETMYGOLD_FETCH))
  },
  doGuess: (params) => {
    return dispatch(loadRepos(DOGUESS_FETCH,params))
  },
});

const mapStateToProps = createStructuredSelector({
  isShowMask: makeSelectIsShowMask(),
  clanId: makeSelectClanId(),
  myGoldAccount: makeSelectMyGoldAccount()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'champion', reducer });
const withSaga = injectSaga({ key: 'champion', saga });

export default compose(withReducer,withSaga, withConnect)(ChampionPage);
export { mapDispatchToProps };
