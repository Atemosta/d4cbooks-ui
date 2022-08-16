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
  // ToggleColorMode
  Upgrade,
  ViewExpenses
} from './components'

// Import API Calls
import getExpenses from './api/getExpenses';

// Import Images
import imgWrite from './assets/gif/write.gif'

// Theme Settings
const ColorModeContext = createContext({ toggleColorMode: () => {} });

function App() {
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

  // Render Content when Connected
  const renderContent = () => {
    if (loading) {return (<center><LoadingIndicator/></center>);} 
    else if (location === "About") {return(<About address={address} setLocation={setLocation}/>)}
    else if (location === "Pricing") {return(<Pricing setLocation={setLocation}/>)}
    else if (location === "Support") {return(<Support/>)}
    else if (address) {
      if (location === "Create") {return (<CreateExpense address={address} data={expenses} setData={setExpenses} setLocation={setLocation}/>);} 
      else if (location === "View") {
        if (expenses.length > 0) {return(<ViewExpenses address={address} data={expenses} setData={setExpenses}/>);}
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
    else if (location === "Landing") {return (<ConnectWallet setAddress={setAddress} setLocation={setLocation} />)}
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
      <CssBaseline />
        <main mode={mode} setMode={setMode}>
          <Navbar address={address} setAddress={setAddress} setLocation={setLocation} mode={mode} setMode={setMode}/>
            {renderContent()}
        </main>
      </ThemeProvider>
    </ColorModeContext.Provider>

  );
}

export default App;
