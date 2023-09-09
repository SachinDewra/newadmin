import React, {Component} from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Navbar, NavbarBrand, NavbarToggler,Collapse, NavItem, Nav,
    Form,FormGroup,Button,Label,Input,Modal,ModalHeader,ModalBody } from 'reactstrap';
import AuthService from '../../services/auth.service';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
    }
    logOut() {
        AuthService.logout();
        this.setState({
          currentUser: undefined,
        });
    }
    render() {
        return (
            <>
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <NavLink to="/home" className="brand-link">
            <img src="./dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" ></img>
            <span className="brand-text font-weight-light">AdminLTE 3</span>
            </NavLink>

            <div className="sidebar">
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                <div className="image">
                <img src="./dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image"></img>
                </div>
                <div className="info">
                <a href="#" className="d-block">Alexander Pierce</a>
                </div>
            </div>

            <div className="form-inline">
                <div className="input-group" data-widget="sidebar-search">
                <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search"></input>
                <div className="input-group-append">
                    <button className="btn btn-sidebar">
                    <i className="fas fa-search fa-fw"></i>
                    </button>
                </div>
                </div>
            </div>
            <nav className="mt-2">
                <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <li className="nav-item">
                    <a href="#" className="nav-link">
                    <i className="nav-icon fas fa-edit"></i>
                    <p>
                        Master's
                        <i className="fas fa-angle-left right"></i>
                    </p>
                    </a>
                    <ul className="nav nav-treeview">
                        <li className="nav-item">
                            <a href="pages/forms/general.html" className="nav-link">
                            <i className="far fa-circle nav-icon"></i>
                            <p>Boards</p>
                            </a>
                        </li>
                    </ul>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/boards">
                    <i className="nav-icon fas fa-edit"></i>
                    <p>Boards</p>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <a href="/" onClick={this.logOut} className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Logout</p>
                    </a>
                </li>
                
                </ul>
                
            </nav>
            </div>
            
        </aside>
            </>
        )
    }
}

export default Sidebar;