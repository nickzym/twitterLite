import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import './style.less';
import { Icon } from 'react-fa';

const mapStateToProps = state => (
    {
        currentUser: state.currentUser,
        errors: state.errors
    }
)

const Header = () => (
    <Navbar default collapseOnSelect>
      <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">TwitterLite <Icon name="fab fa-twitter" /></Link>
            </Navbar.Brand>
            <Navbar.Toggle />
      </Navbar.Header>
        <Navbar.Collapse>
            <Nav pullRight>
              <NavItem eventKey={1} href="/login">
                <Icon name="fab fa-user" />  Login
              </NavItem>
              <NavItem eventKey={2} href="/signup">
                <Icon name="fab fa-user-plus" />  Sign Up
              </NavItem>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
);



export default connect(mapStateToProps, null)(Header);
