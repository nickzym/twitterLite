import React,{Component} from 'react';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import './style.less';
import { Icon } from 'react-fa';

const Header = () => (
    <Navbar default collapseOnSelect>
      <Navbar.Header>
            <Navbar.Brand>
              <a href="#brand">TwitterLite <Icon name="fab fa-twitter" /></a>
            </Navbar.Brand>
            <Navbar.Toggle />
      </Navbar.Header>
        <Navbar.Collapse>
            <Nav pullRight>
              <NavItem eventKey={1} href="#">
                <Icon name="fab fa-user" />  Login
              </NavItem>
              <NavItem eventKey={2} href="#">
                <Icon name="fab fa-user-plus" />  Sign Up
              </NavItem>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
);

export default Header;
