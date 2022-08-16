import React from 'react'
// import imgNotes from '../assets/gif/take-notes.gif'

const About = ({address, setLocation}) => {
  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">{"What is D4CBooks?"}</p>
          <p className="sub-text">{"D4Books is a simple and affordable alternative to quickbooks for expense tracking of receipts."}</p>
          <br/>
          <p className="header gradient-text">{"How do you use D4CBooks?"}</p>
          <p className="sub-text">{"1. Log in with your social or metamask account"}</p>
          <p className="sub-text">{"2. Take a picture"}</p>
          <p className="sub-text">{"3. Write a quick description and price"}</p>
          <p className="sub-text">{"4. Wait for the end of year report to submit for your taxes!"}</p>
          <div className="connect-wallet-container">
            <button
              className="cta-button connect-wallet-button"
              onClick={address ? (() => setLocation("Create")) : (() => setLocation("About"))}
            >
              {"Try out D4CBooks"}
            </button>
          </div>  
        </div>
      </div>
    </div>
  )
}

export default About