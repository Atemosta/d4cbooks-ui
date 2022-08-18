import React from 'react'

const InfoBox = ({mainText, subText, buttonText, image, setLocation, setLocationComponent, externalURL}) => {
  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">{mainText}</p>
          <p className="sub-text">{subText}</p>
          <div className="connect-wallet-container">
            <img
              src={image}
              alt="Anime Girl Giving Information"
              onClick={externalURL ? (() => window.open(`${externalURL}`, '_blank')) : ( () => setLocation(setLocationComponent))}
              style= {{cursor: 'pointer' }}
              />
            <button
              className="cta-button connect-wallet-button"
              onClick={externalURL ? (() => window.open(`${externalURL}`, '_blank')) : ( () => setLocation(setLocationComponent))}
            >
              {buttonText}
            </button>
          </div>  
        </div>
      </div>
    </div>
  )
}

export default InfoBox