import React, { Component } from 'react';
import logo from '../logo.png'

class Reset extends Component {

  render() {
    return (
      <div className="container-fluid mt-5">&nbsp;
        <div className="row">
          <main role="main" className="col-lg-12 d-flex text-center text-monospace">
            <div className="content mr-auto ml-auto">
              <a
                href="http://www.dappuniversity.com/bootcamp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={logo} className="App-logo" alt="logo" />
              </a>
              <h1>Blockchain Master University</h1>
              <h5>Auto Refresh DApp</h5>
              <br></br>
              <br></br>
              <br></br>
              <h3>Please login or switch network to Ropsten</h3>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default Reset;