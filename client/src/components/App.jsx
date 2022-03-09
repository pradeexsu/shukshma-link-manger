import React, { Component } from "react";
import { BrowserRouter, Link, Route, Router, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Footer from "./Footer";
import Home from "./Home";

class App extends Component {
  render() {
    return (
      <div className="outter d-flex text-center text-white bg-dark">
        <div className="cover-container d-flex w-100 p-3 mx-auto flex-column">
          <Header />

          <Home/>

          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
