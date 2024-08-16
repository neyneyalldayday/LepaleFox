import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebookF, faTiktok } from '@fortawesome/free-brands-svg-icons';
import './footer.css'
const Footer
 = () => {
  return (
    <footer className='footer'>
      <div className="social-links">
        <a href="https://www.instagram.com/your_instagram_handle" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} /> 
        </a>
        <a href="https://www.facebook.com/your_facebook_page" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebookF} /> 
        </a>
        <a href="https://www.tiktok.com/@your_tiktok_username" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTiktok} /> 
        </a>
      </div>
      <p>&copy; 2024 LePalefox. All rights reserved.</p>
    </footer>
  )
}

export default Footer
