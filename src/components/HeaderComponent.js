
import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false
        };
        this.toggleNav = this.toggleNav.bind(this);

    }
    //Hàm hien thị menu 
    toggleNav() {
        this.setState({

            isNavOpen: !this.state.isNavOpen

        });
        console.log("NavOpen" + this.state.isNavOpen);
    }
    render() {
        return (
            <React.Fragment>
                <Navbar className="navbar-dark bg-primary header_text" expand="md" >
                    <div className='container '>
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="/">
                            <img src="assets/images/logo.png" height="30" width="41" alt="Ristorante Con Fusion" />
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar >

                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to="/staffs">
                                        <span className="fa fa-users fa-lg">


                                        </span>
                                        Nhân viên

                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/departments">
                                        <span className="fa fa-address-card fa-lg">


                                        </span>
                                        Phòng ban

                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/salary">
                                        <span className="fa fa-money fa-lg">


                                        </span>
                                        Bảng lương

                                    </NavLink>
                                </NavItem>

                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>

            </React.Fragment>
        );
    }
}
export default Header;
