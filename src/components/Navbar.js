import React, { Component } from 'react';
import refresh from '../refresh.png';

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="http://www.dappuniversity.com/bootcamp"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={refresh} height="32" alt=""/>
            Aut0 r3fr3$h
        </a>
      </nav>
    );
  }
}

export default Navbar;