import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

class Portal extends Component {
    constructor(props) {
        super(props);
        this.container = document.createElement('div');
    }

    componentDidMount() {
        document.body.appendChild(this.container);
    }

    componentWillUnmount() {
        document.body.removeChild(this.container);
    }

    render() {
        return createPortal(
            this.props.children,
            this.container,
        );
    }
}

Portal.defaultProps = {
    children: null,
};

Portal.propTypes = {
    children: PropTypes.node,
};

export default Portal;
