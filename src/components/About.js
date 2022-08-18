import imgNotes from '../assets/gif/take-notes.gif'

const About = ({address, setLocation}) => {
  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">{"What is D4CBooks?"}</p>
          <p className="sub-text">{"D4Books is a simple and affordable alternative to quickbooks for expense tracking of receipts and item warranties."}</p>
          <p className="sub-text">{"D4CBooks is currently FREE as we are finding bugs during the initial launch."}</p>
          <img
            src={imgNotes}
            alt="Anime Girl Taking Notes"
            onClick={address ? (() => setLocation("Create")) : (() => setLocation("Landing"))}
            style= {{cursor: 'pointer' }}
          />
          <p className="header gradient-text">{"How do you use D4CBooks?"}</p>
          <p className="sub-text">{"1. Log in with your social or metamask account"}</p>
          <p className="sub-text">{"2. Snap a photo with your phone"}</p>
          <p className="sub-text">{"3. Write a quick description and price"}</p>
          <p className="sub-text">{"4. Wait for the end of year report to submit for your taxes!"}</p>
          <div className="connect-wallet-container">
            <button
              className="cta-button connect-wallet-button"
              onClick={address ? (() => setLocation("Create")) : (() => setLocation("Landing"))}
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