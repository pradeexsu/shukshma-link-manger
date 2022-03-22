import React, { Component } from "react";
import "./App.css";
import Header from "./Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Footer from "./Footer";
import Home from "./Home";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import Dashboard from "./Dashboard";



const AboutUs = () => (
  <>
    <h1>this is about</h1>
  </>
)

class App extends Component {
  state = {
    email: ''
  }
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <BrowserRouter>

        <div className="outter d-flex text-center text-white bg-dark">
          <div className="cover-container d-flex w-100 p-3 mx-auto flex-column">
            <Header />
            <div>
              <Route path="/" exact component={Home} />
              <Route path="/about" component={AboutUs} />
              <Route path="/dashboard" component={Dashboard} />

            </div>
            <Footer />

          </div>
        </div>
      </BrowserRouter>

    );
  }
}

export default connect(null, actions)(App);