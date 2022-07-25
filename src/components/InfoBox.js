import React from 'react'

const InfoBox = ({maintext, subtext, image, setLocation}) => {
  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">{maintext}</p>
          <p className="sub-text">{subtext}</p>
          <div className="connect-wallet-container">
            <img
              src={image}
              alt="Anime Girl Giving Information"
              onClick={() => setLocation("create")}
              style= {{cursor: 'pointer' }}
              />
            <button
              className="cta-button connect-wallet-button"
              onClick={() => setLocation("create")}
            >
              Create Expense
            </button>
          </div>  
        </div>
      </div>
    </div>
  )
}

export default InfoBox