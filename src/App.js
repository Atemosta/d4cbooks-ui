import React, { useState, useMemo, useContext, createContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  ConnectWallet,
  Navbar,
  // ToggleColorMode
} from './components'
import './App.css';
const ColorModeContext = createContext({ toggleColorMode: () => {} });

function App() {
  const [address, setAddress] = useState(null);
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

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
      <CssBaseline />
        <main mode={mode} setMode={setMode}>
          <Navbar address={address} mode={mode} setMode={setMode}/>
          { address 
          ? <div></div>
          : <ConnectWallet/>
          }
        </main>
      </ThemeProvider>
    </ColorModeContext.Provider>

  );
}

export default App;
