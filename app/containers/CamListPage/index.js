import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { loadRepos } from '../App/actions';
import { INIT_FETCH } from './constants';
import { makeSelectInitData } from './selectors';
import reducer from './reducer';
import saga from './saga';

import CamListPage from './CamListPage';

const mapDispatchToProps = (dispatch) => ({
  initFetch: ()=>{
    dispatch(loadRepos(INIT_FETCH))
  },
});

const mapStateToProps = createStructuredSelector({
  initData: makeSelectInitData(),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'camList', reducer });
const withSaga = injectSaga({ key: 'camList', saga });

export default compose(withReducer,withSaga, withConnect)(CamListPage);
export { mapDispatchToProps };

