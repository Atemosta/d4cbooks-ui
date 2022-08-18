import React, { createContext, useEffect, useMemo, useContext, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  About,
  // ConnectWallet,
  CreateExpense,
  InfoBox,
  LoadingIndicator,
  Navbar,
  Pricing,
  Support,
  Upgrade,
  // ViewExpenses
} from './components'

// ----- API Imports ----- //
import getEnv from "./api/getEnv";
import getExpenses from './api/getExpenses';
import { WEB3AUTH_CLIENT_ID } from "./config";

// ----- Web3Auth Imports ----- //
import { Web3Auth } from "@web3auth/web3auth";
import RPC from "./web3RPC"; // for using web3.js

// Import Images
import imgCamera from "./assets/gif/snap-photos.gif"
import imgLinkStart from "./assets/gif/link-start.gif"
import imgWrite from './assets/gif/write.gif'
import './styles/ConnectWallet.css'

// Theme Settings
const ColorModeContext = createContext({ toggleColorMode: () => {} });

function App() {
  const [connected, setConnected] = useState(false);
  const [web3auth, setWeb3auth] = useState(null);
  const [provider, setProvider] = useState(null);
  const [address, setAddress] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState('Landing');
  const [mode, setMode] = useState('dark');
  const colorMode = useContext(ColorModeContext);
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  const fetchExpenses = async () => {
    try {
      console.log("Fetching Address Expenses...")
      const tempExpenses = await getExpenses(address);
      setExpenses(tempExpenses);
      console.log("Successfully Fetched Expenses!")
    } catch (error) {
      console.log("Error in App/fetchExpenses()");
      console.log(error);
    }
  };


  useEffect(() => {
    if (address) {
      setLoading(true);
      fetchExpenses();
      setLoading(false);
    }
  // eslint-disable-next-line
  }, [address]);

  useEffect(() => {
    const init = async () => {
      try {
      const env  = getEnv();
      const clientId = WEB3AUTH_CLIENT_ID[env]; // TODO: UPDATE
      const web3auth = new Web3Auth({
        clientId: clientId, // get it from Web3Auth Dashboard
        chainConfig: {
          chainNamespace: "eip155",
          chainId: "0x89", // hex of 137, polygon mainnet
        },
      });

      setWeb3auth(web3auth);

      await web3auth.initModal();
      if (web3auth.provider) {
        setProvider(web3auth.provider);
      }

      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  // Render Content when Connected
  const renderContent = () => {
    if (loading) {return (<center><LoadingIndicator/></center>);} 
    else if (location === "About") {return(<About address={address} setLocation={setLocation}/>)}
    else if (location === "Pricing") {return(<Pricing address={address} setLocation={setLocation}/>)}
    else if (location === "Support") {return(<Support/>)}
    else if (address) {
      if (location === "Create") {return (<CreateExpense address={address} data={expenses} setData={setExpenses} setLocation={setLocation}/>);} 
      else if (location === "View") {
        if (expenses.length > 0) {return(<Support/>);}
        // if (expenses.length > 0) {return(<ViewExpenses address={address} data={expenses} setData={setExpenses}/>);}
        else {return(
          <InfoBox 
            mainText="You have not created any expenses!"
            subText="Click on the image or button below to create your first expense."
            buttonText="Create Expense"
            image={imgWrite}
            setLocation={setLocation}
            setLocationComponent="Create"
          />
        )} 
      }
      else if (location === "Configure") {return(<div>Configure Expenses</div>)}
      else if (location === "Upgrade") {return(<Upgrade/>)}
    }
    else if (location === "Landing") {return (
      <ConnectWallet 
        setAddress={setAddress} 
        setLocation={setLocation} 
        web3auth={web3auth} 
        setWeb3auth={setWeb3auth}
        provider={provider}
        setProvider={setProvider}
      />
    )}
  };

  const login = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
    setConnected(true);
  };

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

  const connectWalletFlow = async () => {
    await login();
    await getAccounts();
  };

  const ConnectWallet = () => {
    return (
      <div className="App">
        <div className="container">
          <div className="header-container">
            <p className="header gradient-text">📸 D4CBooks 🧾</p>
            <p className="sub-text">Simple Expense Reporting and Warranty Tracking</p>
            <div className="connect-wallet-container">
              { connected 
              ? <img src={imgLinkStart} alt="Link Start!" />
              : <img src={imgCamera} alt="Anime Girl Taking Photos with Digital Camera" />
              }
              <button
                className="cta-button connect-wallet-button"
                onClick={connectWalletFlow}
              >
                { connected ? "Start App!" : "Create Account / Login"}
              </button>
            </div>  
          </div>
        </div>
      </div>
    )
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
      <CssBaseline />
        <main mode={mode} setMode={setMode}>
          <Navbar 
            address={address} 
            setAddress={setAddress} 
            setLocation={setLocation} 
            mode={mode} 
            setMode={setMode}
            web3auth={web3auth}
            setProvider={setProvider}
            setConnected={setConnected}
          />
            {renderContent()}
        </main>
      </ThemeProvider>
    </ColorModeContext.Provider>

  );
}

export default App;
