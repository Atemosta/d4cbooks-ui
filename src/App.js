import React, { useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ToggleColorMode from './components/ToggleColorMode';

function App() {
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
    <ThemeProvider theme={theme}>
      <main>
        <ToggleColorMode mode={mode} setMode={setMode}/>
        <p>Mode: {mode}</p>
      </main>
    </ThemeProvider>
  );
}

export default App;
