import React, { createContext, useEffect, useMemo, useContext, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  About,
  ConnectWallet,
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

// Import Images
import imgWrite from './assets/gif/write.gif'

// Theme Settings
const ColorModeContext = createContext({ toggleColorMode: () => {} });

function App() {
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
  // eslint-disable-next-line 
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
          />
            {renderContent()}
        </main>
      </ThemeProvider>
    </ColorModeContext.Provider>

  );
}

export default App;
