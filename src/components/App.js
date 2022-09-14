import React, { Component } from "react";

import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import KrytoBird from '../abis/KryptoBird.json';

import {MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn, MDBContainer} from 'mdb-react-ui-kit';
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
    this.setState({account:accounts[0]})

    // access blockchain network ID
    const networkId = await web3.eth.net.getId()
    const networkData = KrytoBird.networks[networkId]
    
    if(networkData) {
      const abi = KrytoBird.abi
      const address = networkData.address
      const contract = new web3.eth.Contract(abi, address)
      this.setState({contract})

      // call totalSupply
      const totalSupply = await contract.methods.totalSupply().call()
      this.setState({totalSupply})
      
      // track tokens - load Kryptobirdz array []
      for(let i = 1; i <= totalSupply; i++) {
        const KryptoBird = await contract.methods.kryptoBirdz(i-1).call()
        this.setState({kryptoBirdz:[...this.state.kryptoBirdz, KryptoBird]})
      }
    } else {
      window.alert('Smart contract not deployed')
    }
  }

  // access mint function
  mint = (kryptoBird) => {
    this.state.contract.methods.mint(kryptoBird).send({from:this.state.account})
    .once('receipt', (receipt) => {
      this.setState({kryptoBirdz:[...this.state.kryptoBirdz, this.KryptoBird]})
    })
  }

  // set the state
  constructor(props) {
    super(props);
    this.state = {
      account:'',
      contract:null,
      totalSupply:0,
      kryptoBirdz:[]
    }
  }

  render() {
    return(
      <div className="container-filled">        
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

        <div className="container-fluid mt-1">
          <div className="row">
            <main role='main' className="col-lg-12 d-flex text-center" style={{opacity:'0.8', justifyContent:'center'}}>
              <div className="content mr-auto ml-auto">
                <h1 style={{color:'white'}}>CHON - NFT Marketplace</h1>
                <form onSubmit={(event)=>{
                  event.preventDefault()
                  const kryptoBird = this.kryptoBird.value
                  this.mint(kryptoBird)
                }}>
                  <input
                  type='text'
                  placeholder='File location'
                  className='form-control mb-1'
                  ref={(input)=>this.kryptoBird = input}
                  />
                  <input style={{margin:'6px'}}
                  type='submit'
                  className="btn btn-primary btn-black"
                  value='MINT'/>
                </form>
              </div>
            </main>
          </div>
          <hr></hr>
          <MDBContainer>
            <MDBRow start>
              {this.state.kryptoBirdz.map((kryptoBird, key)=>{
                return(
                  <MDBCol size='auto' className='mr-auto'>
                      <MDBCard className="token img" style={{maxWidth:'22rem'}}>
                        <MDBCardImage src={kryptoBird} position='top' height='250rem' style={{marginRight:'4px'}}/>
                        <MDBCardBody>
                          <MDBCardTitle>CHON NFTs</MDBCardTitle>
                          <MDBCardText>The CHON NFTs, 8 unique non-fungible tokens representing as membership keys to the CHON's metaverse.</MDBCardText>
                          <MDBBtn href={kryptoBird}>Download</MDBBtn>
                        </MDBCardBody>
                      </MDBCard>
                  </MDBCol>
                )
              })}
            </MDBRow>
          </MDBContainer>
        </div>
      </div>
    )
  }
}

export default App;