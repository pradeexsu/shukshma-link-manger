import React, { Component } from "react";
import "./Header.css"
class Header extends Component {
  render() {
    console.log(this.props);
    return (
      <header className="mb-auto">
        <div>
          <h3 className="float-md-start mb-0">Shuksma</h3>
          <nav className="nav nav-masthead justify-content-center float-md-end">
            <a className="nav-link active" aria-current="page" href="#">
              Home
            </a>
            <a className="nav-link" href="#">
              Features
            </a>
            <a className="nav-link" href="#">
              Contact
            </a>
            {true ? (
              <div className="nav-link dropdown text-end">
                <a
                  href="#"
                  className="d-block link-light text-decoration-none dropdown-toggle"
                  id="dropdownUser1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="https://github.com/mdo.png"
                    alt="mdo"
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
                    <a className="dropdown-item" href="#">
                      New project...
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Settings
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Profile
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            ) : (
              <a className="nav-link" href="#">
                Sign Up
              </a>
            )}
          </nav>
        </div>
      </header>
    );
  }
}

export default Header;
