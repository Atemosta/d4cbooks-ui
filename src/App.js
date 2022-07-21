import React, { useState, useMemo, useContext, createContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  ConnectWallet,
  CreateExpense,
  Navbar,
  // ToggleColorMode
} from './components'
const ColorModeContext = createContext({ toggleColorMode: () => {} });

function App() {
  const [address, setAddress] = useState(null);
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

  // Render Content when Connected
  const renderContent = () => {
    if (location === "create") {
      return (
        <div>
          Create Expenses
        </div>
      );
    } else if (location === "view") {
      return(<div>View Expenses</div>);
    } else if (location === "configure") {
      return(<div>Configure Expenses</div>);
    }
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
