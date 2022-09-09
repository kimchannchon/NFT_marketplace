import React, { Component } from "react";

import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import KrytoBird from '../abis/KryptoBird.json'

class App extends Component {

  // call the func once render
  async componentDidMount() {
    await this.loadWeb3();
  }

  // detect ethereum provider
  async loadWeb3() {
    const provider = await detectEthereumProvider();

    // log if web3 wallet connected
    if(provider) {
      console.log('ethereum wallet is connected')
      window.web3 = new Web3(provider)
    } else {
      console.log('no ethereum wallet is detected')
    }
  }

  render() {
    return(
      <div>
        <h1>NFT Marketplace</h1>
      </div>
    )
  }
}

export default App;