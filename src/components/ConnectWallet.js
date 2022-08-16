import React, { useState } from 'react'

// Style Imports
import imgCamera from "../assets/gif/snap-photos.gif"
import '../styles/ConnectWallet.css'

// Web3 Imports
// import Torus from "@toruslabs/torus-embed";
// import Web3 from "web3";

// MUI Imports
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  color: 'white',
};

const ConnectWallet = ({setAddress, setLocation}) => {
  // Connect Wallet Modal State
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

	// Connect with Social
  // const torusLogin = async (e) => {
  //   e.preventDefault();

  //   setLoading(true)
  //   const torus = new Torus({});
  //   await torus.init({
  //     enableLogging: false,
  //   });
  //   setLoading(false)
  //   await torus.login();

  //   const web3 = new Web3(torus.provider);
  //   const address = (await web3.eth.getAccounts())[0];
  //   setAddress(address);
  // };

  // Connect With Web3
	const metamaskLogin = async () => {
    setLoading(true)
		try {
			const { ethereum } = window;

			if (!ethereum) {
				alert("Get MetaMask -> https://metamask.io/");
				return;
			}

			// Fancy method to request access to account.
			const accounts = await ethereum.request({ method: "eth_requestAccounts" });
		
			// Boom! This should print out public address once we authorize Metamask.
			console.log("Connected", accounts[0]);
			setAddress(accounts[0]);
      setLocation("Create")
		} catch (error) {
			console.log(error)
		}
    setLoading(false)
	}

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">📸 D4CBooks 🧾</p>
          <p className="sub-text">Web3 Expense Reporting and Warranty Tracking</p>
          <div className="connect-wallet-container">
            <img
              src={imgCamera}
              alt="Anime Girl Taking Photos with Digital Camera"
            />
            <button
              className="cta-button connect-wallet-button"
              onClick={handleOpen}
            >
              Create Account / Login
            </button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h5" component="h2">
                  LOGIN
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Connect with the same social login you used to create your wallet
                </Typography>
                <center>
                  <br/>
                  <button className="cta-button connect-wallet-button-social" disabled={loading} onClick={() => alert("CONNECT WITH SOCIAL: Coming Soon...")}>
                    { loading ? "Connecting Wallet..." : "📧 CONNECT WITH SOCIAL"}
                  </button>
                  <br/><br/>
                    <hr className="connect-wallet-button-divider-left"/>
                    OR
                    <hr className="connect-wallet-button-divider-right"/>
                  <br/><br/>
                  <button className="cta-button connect-wallet-button-web3" disabled={loading} onClick={metamaskLogin}>
                    { loading ? "Connecting Wallet..." : "🦊 METAMASK"}
                  </button>
                </center>
              </Box>
            </Modal>
          </div>  
        </div>
      </div>
    </div>
  )
}

export default ConnectWallet