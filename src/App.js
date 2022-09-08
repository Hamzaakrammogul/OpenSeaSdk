import './App.css';
import * as Web3 from 'web3'
import { WyvernSchemaName } from "opensea-js/lib/types"

const { OpenSeaSDK ,Network}= require("opensea-js")

const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/f9088ceaa1444035b0ab88ba1f1f0c9f')

const API_KEY = "40392d7387d34dea8751d0b639379f20";
const openSeaSDK = new OpenSeaSDK(provider, {
  networkName: Network.Main,
  apiKey: API_KEY
})

const contract_address="0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D";
const token_id="9357";
function App() {

  const getTokens = async ()=>{
    const asset = await openSeaSDK.api.getAsset({
      tokenAddress: contract_address, // string
      tokenId: token_id, // string | number | null
    })
    console.log(asset);
  }

  const getbalance =async ()=>{
    const account_address = "0x736b78bD08095461B1de06F4Eec5B505e5C5f96F";
    const asset = {
      tokenAddress: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D", // CryptoKitties
      tokenId: "7230", // Token ID
    }
    const balance = await openSeaSDK.getAssetBalance({
        accountAddress: account_address, // string
        asset: asset
    });
    console.log(balance);
  };
  const making_offers = async ()=>{
    const account_Address = '0x736b78bD08095461B1de06F4Eec5B505e5C5f96F'
    const token_Address="0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D" 
    const token_Id= "7230" // Token ID

const offer = await openSeaSDK.createBuyOrder({
  asset: {
    tokenId: token_Id,
    tokenAddress: token_Address,
    schemaName: WyvernSchemaName
  },
  accountAddress: account_Address,
  // Value of the offer, in units of the payment token (or wrapped ETH if none is specified):
  startAmount: 1.2,
})
  };
const fetch_order = async ()=>{
  const token_Address="0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D" 
  const token_Id= "7230"
  const { orders, count } = await openSeaSDK.api.getOrders({
    assetContractAddress: token_Address,
    tokenId: token_Id,
    side: "bid"
  })
  console.log(orders)
}
  return (
    <div className="App">
      <button onClick={getTokens}>Get Asset</button>
      <button onClick={getbalance} >Get Balance</button>
      <button onClick={making_offers}>Make Offers</button>
      <button onClick={fetch_order}>Fetch Orders</button>
    </div>
  );
}
export default App;
