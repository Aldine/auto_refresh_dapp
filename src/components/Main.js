import React, { Component } from 'react';
import logo from '../logo.png'
import eth from '../eth.png'

class Main extends Component {

  render() {
    return (
      <div className="container-fluid mt-5">&nbsp;
        <div className="row">
          <main role="main" className="col-lg-12 d-flex text-center">
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
              <table className="table table-hover table-bordered" style={{ 'width': '768px' }}>
                <thead className="thead-dark">
                  <tr>
                    <th scope="col" style={{ 'width': '250px' }}>Action</th>
                    <th scope="col" style={{ 'width': '250px' }}>Result</th>
                    <th scope="col" style={{ 'width': '250px' }}>Connection</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Current User Address</th>
                    <td>{this.props.account.substring(0,6)}...{this.props.account.substring(36,42)}</td>
                    <td>Web3+MetaMask</td>
                  </tr>
                  <tr>
                    <th scope="row">Current Network ID</th>
                    <td>{this.props.netId}</td>
                    <td>Web3+MetaMask</td>
                  </tr>
                  <tr>
                    <th scope="row">User Wallet Balance</th>
                      <td>
                        {((this.props.userBalance)/10**18).toFixed(5)}
                        <img src={eth} height="20" alt=""/>
                      </td>
                    <td>Web3+MetaMask</td>
                  </tr>
                  <tr>
                    <th scope="row">Contract Balance</th>
                      <td>
                        {((this.props.contractBalance)/10**18).toFixed(5)}
                        <img src={eth} height="20" alt=""/>
                      </td>
                    <td>Web3+ContractEvent</td>
                  </tr>
                  <tr>
                    <th scope="row">Contract User Balance</th>
                      <td>
                        {((this.props.contractUserBalance)/10**18).toFixed(5)}
                        <img src={eth} height="20" alt=""/>
                      </td>
                    <td>Web3+ContractEvent</td>
                  </tr>
                </tbody>
              </table>
                <div className="input-group mb-4 mr-auto ml-auto" style={{ 'width': '500px' }}>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control form-control-md"
                    placeholder="amount..."
                    onChange={(e) => this.props.amountChange(e.target.value)}
                    required
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <img src={eth} height="20" alt=""/>&nbsp;<b>ETH</b>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-success btn-lg"
                  onClick={(event) => {
                    event.preventDefault()
                    //start with digit, digit+dot or single dot; end with digit.
                    var reg = new RegExp("^[0-9]*.?[0-9]+$")

                    if(reg.test(this.props.amount)){
                      this.props.deposit(this.props)
                    } else {
                      window.alert('Please type positive interger or float numbers')
                    }
                  }}>
                    Deposit
                </button>
                <button
                  type="submit"
                  className="btn btn-danger btn-lg"
                  onClick={(event) => {
                    event.preventDefault()
                    //start with digit, digit+dot or single dot; end with digit.
                    var reg = new RegExp("^[0-9]*.?[0-9]+$")

                    if(reg.test(this.props.amount)){
                      this.props.withdraw(this.props.props)
                    } else {
                      window.alert('Please type positive interger or float numbers')
                    }
                  }}>
                    Withdraw
                </button>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default Main;