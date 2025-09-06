import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'> 
      <p className="app-download-title">
        🌟 Stay Connected with <span>E-Taste</span> 🌟
      </p>
      <p className="app-download-subtext">
        Get exclusive offers, updates, and delicious deals delivered straight to your inbox or WhatsApp.
      </p>

      <div className="app-download-platforms">
        <button className="subscribe-btn">📩 Subscribe to Newsletter</button>
        <button className="whatsapp-btn">💬 Join WhatsApp Updates</button>
      </div>

<div className="app-socials">
  <p>Or follow us on:</p>
  <div className="social-icons">
    <a href="https://www.facebook.com/mohit.m.92372446" target="_blank" rel="noopener noreferrer">
      <img src={assets.facebook_icon} alt="Facebook" style={{ filter: 'invert(40%) sepia(100%) saturate(500%) hue-rotate(180deg)' }} />
    </a>
    <a href="https://www.instagram.com/roshansaini_9571" target="_blank" rel="noopener noreferrer">
      <img src={assets.instagram_icon} alt="Instagram" style={{ filter: 'invert(50%) sepia(100%) saturate(500%) hue-rotate(300deg)' }} />
    </a>
    <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
      <img src={assets.twitter_icon} alt="Twitter" style={{ filter: 'invert(45%) sepia(100%) saturate(500%) hue-rotate(200deg)' }} />
    </a>
  </div>
</div>

    </div>
  )
}

export default AppDownload
