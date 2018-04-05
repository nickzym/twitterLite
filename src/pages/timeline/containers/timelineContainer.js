import timelinePage from '../components/timelinePage';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import * as actions  from '../../../store/actions/home';
import { fetchTwittes } from '../../../store/actions/twittes';

const mapStateToProps = state => ({
  twittes: state.twittes
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchTwittes
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(timelinePage);
