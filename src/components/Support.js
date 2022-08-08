import React from 'react'
import InfoBox from './InfoBox';
import imgMatrix from '../assets/matrix.jpeg'

const Support = () => {
  return (
    <InfoBox 
    mainText="Need help? Have questions or feedback for D4CBooks?"
    subText="Send an email to ohaiyo+d4cbooks@atemosta.com or click on the image below to join our Matrix community for faster support!"
    buttonText="Join Matrix"
    image={imgMatrix}
    externalURL="https://matrix.to/#/!UEyjGwwRMPjUGFxiKu:atemosta.com?via=atemosta.com"
    />
  )
}

export default Support