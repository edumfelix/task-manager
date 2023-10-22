import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavbarToggler } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

interface NavMenuState {
  collapsed: boolean;
}

export class NavMenu extends Component<{}, NavMenuState> {
  static displayName = NavMenu.name;

  constructor(props: any) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <NavbarBrand tag={Link} to="/">Task Manager</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
        </Navbar>
      </header>
    );
  }
}
