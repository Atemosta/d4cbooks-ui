// Style Imports
import imgCamera from "../../assets/gif/snap-photos.gif"
import '../../styles/ConnectWallet.css'

// import { SafeEventEmitterProvider } from "@web3auth/base";
import RPC from "./web3RPC"; // for using web3.js

const ConnectWallet = ({setAddress, setLocation, web3auth, provider, setProvider}) => {

  const login = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
    getAccounts();
  };

  // const logout = async () => {
  //   if (!web3auth) {
  //     console.log("web3auth not initialized yet");
  //     return;
  //   }
  //   await web3auth.logout();
  //   setProvider(null);
  // };

  const getAccounts = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    console.log("Connected", address);
    setAddress(address);
    setLocation("Create")
  };

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">📸 D4CBooks 🧾</p>
          <p className="sub-text">Simple Expense Reporting and Warranty Tracking</p>
          <div className="connect-wallet-container">
            <img
              src={imgCamera}
              alt="Anime Girl Taking Photos with Digital Camera"
            />
            <button
              className="cta-button connect-wallet-button"
              onClick={login}
            >
              Create Account / Login
            </button>
          </div>  
        </div>
      </div>
    </div>
  );
}

export default ConnectWallet;