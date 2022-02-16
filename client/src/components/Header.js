import React, { Component } from "react";
import { connect } from "react-redux";

class Header extends Component {
  render() {
      console.log(this.props)
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="/" className="brand-logo">
            Shuksma
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <a href="http://localhost:3000/auth/google">
                Sign Up with Google
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
