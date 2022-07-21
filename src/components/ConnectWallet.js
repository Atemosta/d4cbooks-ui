import React from 'react'

const ConnectWallet = () => {
  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">📸 D4CBooks 🧾</p>
          <p className="sub-text">Web3 Expense Reporting and Warranty Tracking</p>
          <div className="connect-wallet-container">
            <img
              src="https://c.tenor.com/B1E638M9DQAAAAAC/anime-taking-pictures.gif"
              alt="Anime Girl Taking Photos with Digital Camera"
            />
            <button
              className="cta-button connect-wallet-button"
              // onClick={connectWalletAction}
            >
              Create Account / Login
            </button>
        </div>  
      </div>
    </div>
  </div>
  )
}

export default ConnectWallet