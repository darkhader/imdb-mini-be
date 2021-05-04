import React, { Component } from "react";

import SearchField from "./SearchField";
import logo from "../img/imdb-logo.png";
import ProfilePanel from "./ProfilePanel";
import { NavbarBrand } from 'reactstrap'
import { Link } from "react-router-dom";

class NavBar extends Component {
    render() {
        const params = new URL(window.location.href).pathname.split("/");
        const alias = params[params.length - 1];
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <NavbarBrand>
                    <Link to="/">
                        <img src={logo} alt="IMDb Logo" />
                    </Link>
                </NavbarBrand>
                <div className="collapse navbar-collapse container" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className={`nav-item ${alias?.length === 0 ? 'active' : ''}`}>
                            <Link to={"/"} className="nav-link"><h3>Home</h3></Link>
                        </li>
                        <li className={`nav-item ${window.location.href.indexOf('/movie') !== -1 ? 'active' : ''}`}>
                            <Link to={"/movie"} className="nav-link"><h3>Movie</h3></Link>
                        </li>
                        <li className={`nav-item ${window.location.href.indexOf('/actor') !== -1 ? 'active' : ''}`}>
                            <Link to={"/actor"} className="nav-link"><h3>Actor/Actress</h3></Link>
                        </li>
                        <li className={`nav-item ${window.location.href.indexOf('/addNew') !== -1 ? 'active' : ''}`}>
                            <Link to={"/addNew"} className="nav-link"><h3>Add Actor</h3> </Link>
                        </li>

                        <li className={`nav-item ${window.location.href.indexOf('/createNew') !== -1 ? 'active' : ''}`}>
                            <Link to={"/createNew"} className="nav-link"><h3>Add Movie</h3> </Link>
                        </li>
                        <li className={`nav-item ${window.location.href.indexOf('/SignUp') !== -1 ? 'active' : ''}`}>
                            <Link to={"/SignUp"} className="nav-link"><h3>Register</h3> </Link>
                        </li>

                    </ul>

                    <SearchField onSearchChanged={this.props.onSearchChanged} />


                    <ProfilePanel
                        onNameSignin={this.props.onNameSignin}
                        onCMTSignin={this.props.onCMTSignin}
                        username={this.props.username}
                        onLogin={this.props.onLogin}
                    />
                </div>
            </nav>
        );
    }
}

export default NavBar;