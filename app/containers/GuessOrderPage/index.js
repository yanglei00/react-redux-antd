import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {VOTE_FETCH} from './constants';
import { loadRepos } from '../App/actions';

import {makeSelectInitData} from './selectors';

import reducer from './reducer';
import saga from './saga';

import GuessOrderPage from './GuessOrderPage';

const mapDispatchToProps = (dispatch) => ({
  voteFn: (clanId, callback)=>{
    dispatch(loadRepos(VOTE_FETCH,{clanId, callback}))
  },
  onSubmitForm: (evt) => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    dispatch(loadRepos());
  }
});

const mapStateToProps = createStructuredSelector({
  initData: makeSelectInitData(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'guessOrder', reducer });
const withSaga = injectSaga({ key: 'guessOrder', saga });

export default compose(withReducer,withSaga, withConnect)(GuessOrderPage);
export { mapDispatchToProps };

