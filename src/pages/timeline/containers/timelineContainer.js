import timelinePage from '../components/timelinePage';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import * as actions  from '../../../store/actions/home';
import { fetchTwittes, deleteTwitte } from '../../../store/actions/twittes';

const mapStateToProps = state => ({
  twittes: state.twittes,
  currentUser: state.currentUser
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchTwittes,
      deleteTwitte
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(timelinePage);
