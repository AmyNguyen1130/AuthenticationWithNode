import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../actions'

class Header extends Component {

    constructor(props) {
        super(props);
        this.signOut = this.signOut.bind(this);
    }

    signOut() {
        this.props.signOut();
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-branch" to="/"> ReactJs Fun</Link>

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/dashboard">Dashboard</Link>
                        </li>
                    </ul>

                    <ul className="nav navbar-nav ml-auto">
                        {!this.props.isAuth ?
                            [<li className="nav-item" key="signUp">
                                <Link className="nav-link" to="/signup">Signup</Link>
                            </li>
                                ,
                            <li className="nav-item" key="signIn">
                                <Link className="nav-link" to="/signin">Signin</Link>
                            </li>]
                            : null}

                        {this.props.isAuth ?
                            <li className="nav-item">
                                <Link className="nav-link" to="/signout" onClick={this.signOut}>Signout</Link>
                            </li>
                            : null}
                    </ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuth: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps, actions)(Header);