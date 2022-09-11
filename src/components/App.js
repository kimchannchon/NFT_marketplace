import React, { Component } from "react";

import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import KrytoBird from '../abis/KryptoBird.json';

import './App.css';

class App extends Component {

  // call the func once render
  async componentDidMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  // detect ethereum provider
  async loadWeb3() {
    const provider = await detectEthereumProvider();

    // log if web3 wallet connected
    if(provider) {
      console.log('ethereum wallet is detected')
      window.web3 = new Web3(provider)
    } else {
      console.log('no ethereum wallet is detected')
    }
  }
  
  async loadBlockchainData() {
    const web3 = window.web3

    // get the connnected account
    const accounts = await web3.eth.getAccounts();
    this.setState({account:accounts})

    // access blockchain network ID
    const networkId = await web3.eth.net.getId()
    const networkData = KrytoBird.networks[networkId]
    
    if(networkData) {
      const abi = KrytoBird.abi
      const address = networkData.address
      const contract = new web3.eth.Contract(abi, address)
      console.log(contract)
    }
  }

  // set the state
  constructor(props) {
    super(props);
    this.state = {
      account: ''
    }
  }

  render() {
    return(
      <div>
        <nav className="navbar navbar-dark bg-dark fixed-top flex-md-nowrap p-0 shadow">
          <div className="navbar-brand col-sm-3 col-md-3 mr-0" style={{color:'white'}}>
            CHON NFTs (Non Fungible Tokens)
          </div>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-block">
              <small className="text-white">
                {this.state.account}
              </small>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default App;