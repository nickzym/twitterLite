import React,{Component} from 'react';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import './style.less';
import { Icon } from 'react-fa';
import { Input } from 'antd';

const Footer = () => (
    <div className="footer-container">
        <footer>
            <div>
                <span>TwitterLite 2018 made by Yiming Zhang | <a href="/restaurants">Home</a> | <a href="#">New Post</a></span>
                <span>I am a CS graduate student in University of Southern California.</span>
                <ul>
                    <li><a href="https://www.facebook.com/nickzym"><Icon name="fab fa-facebook-f" /></a></li>
                    <li><a href="https://www.instagram.com/nnnickzym"><Icon name="fab fa-instagram" /></a></li>
                    <li><a href="https://www.linkedin.com/in/yimingzh/"><Icon name="ab fa-linkedin" /></a></li>
                    <li><a href="https://github.com/nickzym"><Icon name="fab fa-github" /></a></li>
                </ul>
            </div>
            <hr className="twl--footer-bar"/>
            <div>
                <p>Require IOS & Android developer to collaborate in this project</p>
                <Input size="default" placeholder="@email"/>
            </div>
        </footer>
    </div>
);

export default Footer;
