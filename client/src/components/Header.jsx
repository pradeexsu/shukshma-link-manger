import React, { Component } from "react";
import "./Header.css"
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  state = { path: "/" }
  renderContent() {
    switch (this.props.auth) {
      case null:
        return null;
      case false:
        return (
          <a className="nav-link" href="/auth/google">Login With Google</a>);
        break;
      default:
        return (
          <>
            <Link
              className={`nav-link ${this.state.path === "/" ? "active" : ""}`}
              aria-current="page"
              to="/"
              onClick={() => this.setState({ path: window.location.pathname })}
            >
              Home
            </Link>
            <Link
              className={`nav-link ${this.state.path === "/dashboard" ? "active" : ""}`}
              to="/dashboard"
              onClick={() => this.setState({ path: window.location.pathname })}
            >
              Dashboard
            </Link>
            <div className="nav-link dropdown text-end">
              <a
                to="#"
                className="d-block link-light text-decoration-none dropdown-toggle"
                id="dropdownUser1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={this.props.auth.picture}
                  alt="dp"
                  width="32"
                  height="32"
                  className="rounded-circle"
                />
              </a>
              <ul
                className="dropdown-menu text-small"
                aria-labelledby="dropdownUser1"
                style={{
                  position: "absolute",
                  inset: "0px auto auto 0px",
                  margin: "0px",
                  transform: "translate3d(0px, 34px, 0px)",
                }}
                data-popper-placement="bottom-start"
              >
                <li>
                  <a className="dropdown-item" disabled href="#">
                    {this.props.auth.name}
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" disabled href="#">
                    {this.props.auth.email}
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="/api/logout">
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </>
        )
    }
  }
  render() {
    console.log(this.props);
    return (
      <header className="mb-auto">
        <div>
          <h3 className="float-md-start mb-0">
            <Link to="/" className="text-decoration-none text-white">
              Shuksma</Link></h3>
          <nav className="nav nav-masthead justify-content-center float-md-end">
            {this.renderContent()}
          </nav>
        </div>
      </header>
    );
  }
}

function mapStateToProp({ auth }) {
  return { auth };
}
export default connect(mapStateToProp)(Header);
