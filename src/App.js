import React, { useState, useMemo, useContext, createContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ToggleColorMode from './components/ToggleColorMode';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

function App() {
  const colorMode = useContext(ColorModeContext);
  const [mode, setMode] = useState('light');
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
        <main>
          <ToggleColorMode mode={mode} setMode={setMode}/>
          <p>Mode: {mode}</p>
        </main>
      </ThemeProvider>
    </ColorModeContext.Provider>

  );
}

export default App;
