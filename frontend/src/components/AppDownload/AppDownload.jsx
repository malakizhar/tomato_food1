import React from 'react';
import './AppDownload.css';
import { assets } from '../../assets/assets';

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
      <p>For a better experience, download the <br/> Tomato app today!</p>
      <div className="app-download-platform">
        <img src={assets.play_store} alt="Download from Google Play Store" />
        <img src={assets.app_store} alt="Download from Apple App Store" />
      </div>
    </div>
  );
}

export default AppDownload;
