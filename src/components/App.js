import React, { Component } from 'react'
import Navbar from './Navbar'
import Reset from './Reset'
import Main from './Main'
import Web3 from 'web3'
import './App.css'

  /**
    * Example of DApp, that refresh UI without reloading the page.
    *
    * loadBlockchainData() will update UI in 3x cases:
    * Case 1: User connect to DApp.
    * Case 2: User change account.
    * Case 3: User change network.
    *
    * deposit() and withdraw() will update UI after:
    * - receving transaction hash
    * - receving contract event
    */
class App extends Component {

  async componentWillMount() {
    await this.loadBlockchainData(this.state.props)
  }

  async loadBlockchainData(props) {
    /* Case 1, User connect for 1st time */
    if(typeof window.ethereum !== 'undefined'){
      window.ethereum.autoRefreshOnNetworkChange = false; //prevent refresing while chaning network
      this.update(props)
      /* Case 2 - User switch account */
      window.ethereum.on('accountsChanged', async (accounts) => {
        this.update(props)
      });

      /* Case 3 - User switch network */
      window.ethereum.on('chainChanged', async (chainId) => {
        this.update(props)
      });
    }
  }

  async update(props) {
    let web3, netId, ABI, ADDRESS, contract, accounts, account, userBalance, contractBalance, contractUserBalance
    
    web3 = new Web3(window.ethereum)
    netId = await web3.eth.net.getId()

    ABI = [{"inputs": [],"stateMutability": "nonpayable","type": "constructor"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "who","type": "address"},{"indexed": false,"internalType": "uint256","name": "amount","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "balance","type": "uint256"}],"name": "Deposit","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "who","type": "address"},{"indexed": false,"internalType": "uint256","name": "amount","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "balance","type": "uint256"}],"name": "Withdraw","type": "event"},{"stateMutability": "payable","type": "fallback"},{"inputs": [{"internalType": "address","name": "","type": "address"}],"name": "balanceOf","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "deposit","outputs": [],"stateMutability": "payable","type": "function"},{"inputs": [{"internalType": "uint256","name": "amount","type": "uint256"}],"name": "withdraw","outputs": [],"stateMutability": "nonpayable","type": "function"}]
    ADDRESS = '0xAF9C287fa2BE22916c95C18286FE47BB42ddCE00' //Ropsten
    contract = new web3.eth.Contract(ABI, ADDRESS)

    accounts = await web3.eth.getAccounts()
    account = accounts[0]

    if(netId!==3 || !account) {
      this.setState({reset: true})
    } else {
      userBalance = await web3.eth.getBalance(account)
      contractBalance = await web3.eth.getBalance(ADDRESS)
      contractUserBalance = await contract.methods.balanceOf(account).call()

      this.setState({
        web3: web3,
        reset: false,
        netId: netId,
        account: account,
        contract: contract,
        userBalance: userBalance,
        contractBalance: contractBalance,
        contractUserBalance: contractUserBalance
      })
    }
  }

  async deposit(props) {
    this.state.contract.methods.deposit().send({from: this.state.account, value: this.state.web3.utils.toWei(this.state.amount)})
    .on('transactionHash', (hash) => { //receving transaction hash
      this.state.contract.events.Deposit({}, async(error, event) => { //receving contract event
        this.update(props)
      })
    })
    .on('error', (e) => {
      console.log(e)
    })
  }

  async withdraw(props) {
    this.state.contract.methods.withdraw(this.state.web3.utils.toWei(this.state.amount)).send({from: this.state.account})
    .on('transactionHash', (hash) => { //receving transaction hash
      this.state.contract.events.Withdraw({}, async(error, event) => { //receving contract event
        this.update(props)
      })
    })
    .on('error', (e) => {
      console.log(e)
    })
  }

  async amountChange(amount) {
    this.setState({
      amount: amount
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      web3: '',
      netId: '',
      amount: '',
      account: '',
      reset: false,
      contract: '',
      userBalance: '',
      contractBalance: '',
      contractUserBalance: ''
    }

    this.deposit = this.deposit.bind(this)
    this.withdraw = this.withdraw.bind(this)
    this.amountChange = this.amountChange.bind(this)
  }

  render() {
    return (
      <div className="text-monospace">
        <Navbar />
        {this.state.reset
          ? <Reset />
          : <Main
              deposit={this.deposit}
              withdraw={this.withdraw}
              amountChange={this.amountChange}
              netId={this.state.netId}
              amount={this.state.amount}
              account={this.state.account}
              userBalance={this.state.userBalance}
              contractBalance={this.state.contractBalance}
              contractUserBalance={this.state.contractUserBalance}
        />
        }
      </div>
    );
  }
}

export default App;