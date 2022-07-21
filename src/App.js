import React, { useState, useMemo, useContext, createContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  Navbar,
  // ToggleColorMode
} from './components'
const ColorModeContext = createContext({ toggleColorMode: () => {} });

function App() {
  const colorMode = useContext(ColorModeContext);
  const [mode, setMode] = useState('dark');
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
          <Navbar mode={mode} setMode={setMode}/>
          {/* <ToggleColorMode mode={mode} setMode={setMode}/> */}
          <p>Mode: {mode}</p>
        </main>
      </ThemeProvider>
    </ColorModeContext.Provider>

  );
}

export default App;
