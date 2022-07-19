import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ToggleColorMode from './components/common/ToggleColorMode';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [mode, setMode] = useState('light');
  return (
    <ThemeProvider theme={darkTheme}>
      <main>
        <ToggleColorMode mode={mode} setMode={setMode}/>
        <p>Mode: {mode}</p>
      </main>
    </ThemeProvider>
  );
}

export default App;
