import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import { Avatar, Icon } from 'antd';
import { Icon as IconFont } from 'react-fa';
import './style.less';
import { logOut } from '../../store/actions/auth';
import { success, error } from '../Message/index';

const mapStateToProps = state => (
    {
        currentUser: state.currentUser,
        errors: state.errors
    }
)


class Header extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleUserInfo = this.handleUserInfo.bind(this);
    }

    handleClick(e){
        e.preventDefault();
        this.props.logOut()
        success('Log out successfully!');
        setTimeout(function() {
            window.location.href = '/';
        }, 2000);
    }

    handleUserInfo(e) {
        e.preventDefault();
        window.location.href = `/profile?author=${this.props.currentUser.user.id}`;
    }

    render() {
        const { currentUser } = this.props;
        const avatar = currentUser.user.avatar === '' ?  <Avatar size="small" icon="user" /> : <Avatar size="small" src={currentUser.user.avatar} />;
        return(
            <Navbar default collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                      <Link to="/">TwitterLite <Icon name="fab fa-twitter" /></Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    {
                        currentUser.isAuthenticated ?
                        (
                            <Nav pullRight>
                                <NavItem eventKey={1} href="/profile" onClick={this.handleUserInfo}>
                                    {avatar}
                                </NavItem>
                                <NavItem eventKey={1} href="/login" onClick={this.handleClick}>
                                    <IconFont name="fab fa-sign-out" />  Log Out
                                </NavItem>
                            </Nav>
                        ) :
                        (
                            <Nav pullRight>
                                <NavItem eventKey={1} href="/login">
                                    <Icon type="user" />  Login
                                </NavItem>
                                <NavItem eventKey={2} href="/signup">
                                    <Icon type="user-add" />  Sign Up
                                </NavItem>
                            </Nav>
                        )
                    }

                </Navbar.Collapse>
            </Navbar>
        );
    }
};

export default connect(mapStateToProps, { logOut })(Header);
