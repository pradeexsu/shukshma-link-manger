import React, { Component } from "react";
import { BrowserRouter, Link, Route, Router, Routes } from "react-router-dom";
import {CURRENT_USER} from "./constants"
import "./App.css";
import Header from "./Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Footer from "./Footer";
import Home from "./Home";

class App extends Component {
  state = {
    currentUser: {}
  }
  componentDidMount(){
    const currentUser = JSON.parse(localStorage.getItem(CURRENT_USER))
    this.setState({currentUser})    
  }
  render() {
    return (
      <div className="outter d-flex text-center text-white bg-dark">
        <div className="cover-container d-flex w-100 p-3 mx-auto flex-column">
          <Header currentUser={this.state.currentUser}/>

          <Home/>

          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
