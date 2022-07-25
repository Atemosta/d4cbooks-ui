import React, { createContext, useEffect, useMemo, useContext, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  ConnectWallet,
  CreateExpense,
  InfoBox,
  Navbar,
  // ToggleColorMode
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
  const [location, setLocation] = useState('create');
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

  useEffect(() => {
    if (address) {
      const tempExpenses = await getExpenses(address);
      console.log(tempExpeses);
      setExpenses(tempExpenses);
    }
  }, [address]);

  // Render Content when Connected
  const renderContent = () => {
    if      (location === "create") {return (<CreateExpense/>);} 
    else if (location === "view") {
      if (expenses.length > 0) {return(<ViewExpenses data={expenses} setData={setExpenses}/>);}
      else {return(
        <InfoBox 
          maintext="You have not created any expenses!"
          subtext="Click on the image or button below to create your first expense."
          image={imgWrite}
          setLocation={setLocation}/>
      )} 
    }
    else if (location === "configure") {return(<div>Configure Expenses</div>);}
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
      <CssBaseline />
        <main mode={mode} setMode={setMode}>
          <Navbar address={address} setAddress={setAddress} setLocation={setLocation} mode={mode} setMode={setMode}/>
          { address 
          ? renderContent()
          : <ConnectWallet setAddress={setAddress}/>
          }
        </main>
      </ThemeProvider>
    </ColorModeContext.Provider>

  );
}

export default App;
