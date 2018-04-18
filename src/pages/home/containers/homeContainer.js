import homePage from '../components/homePage'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions  from '../../../store/actions/home';
// 这里的state要看清楚是store的state
const mapStateToProps = state => ({
    currentUser: state.currentUser
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            add: actions.add,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(homePage);
