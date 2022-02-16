import React, { Component } from "react";
import { BrowserRouter, Link, Route, Router, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import "materialize-css/dist/css/materialize.min.css";
import { connect } from "react-redux";
import * as action from "../actions";

const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Landing = () => <h2>Landing</h2>;
const Footer = () => <h2>Footer</h2>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" exact element={<Landing />} />
            <Route path="/surveys" exact element={<Dashboard />} />
            <Route path="/surveys/new" exact element={<SurveyNew />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, action)(App);
