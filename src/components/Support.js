import React from 'react'

const Support = () => {
  return (
    // <InfoBox 
    // mainText="Need help? Have questions or feedback for D4CBooks?"
    // subText="Send an email to ohaiyo+d4cbooks@atemosta.com or click on the image below to join our Matrix community for faster support!"
    // buttonText="Join Matrix"
    // image={imgMatrix}
    // externalURL="https://matrix.to/#/!UEyjGwwRMPjUGFxiKu:atemosta.com?via=atemosta.com"
    // />
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">Need help?</p>
          <p className="header gradient-text">Have questions or feedback for D4CBooks?</p>
          <p className="sub-text">📧 Email: <b><i>ohaiyo+d4cbooks@atemosta.com</i></b></p>
          <p className="sub-text">💬 Live Chat (via Matrix): <b><i><a style={{"text-decoration": "none", "color": "white"}} href="https://matrix.to/#/!UEyjGwwRMPjUGFxiKu:atemosta.com?via=atemosta.com" target="_blank" rel="noopener noreferrer">Click here to join</a></i></b></p>
          <p className="sub-text">🐘 Mastodon (Twitter Alternative):  <b><i><a style={{"text-decoration": "none", "color": "white"}} href="https://mastodon.social/@atemosta" target="_blank" rel="noopener noreferrer">@Atemosta@mastodon.social</a></i></b></p>
        </div>
      </div>
    </div>  
  )
}

export default Support