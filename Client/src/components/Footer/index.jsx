import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebookF, faTiktok } from '@fortawesome/free-brands-svg-icons';
import './footer.css'
import event from '../../assets/event.jpg'
import event2 from '../../assets/event2.jpg'
import event3 from '../../assets/event3.jpg'
import event4 from '../../assets/event4.jpg'
import event5 from '../../assets/event5.jpg'
import event6 from '../../assets/event6.jpg'
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
      <div className='galery'>
        <div className='image-container'>
          <img className='event-image' src={event} alt="" />
        </div>
        <div className='image-container'>
          <img className='event-image' src={event2} alt="" />
        </div>
        <div className='image-container'>
          <img className='event-image' src={event3} alt="" />
        </div>
        <div className='image-container'>
          <img className='event-image' src={event4} alt="" />
        </div>
        <div className='image-container'>
          <img className='event-image' src={event5} alt="" />
        </div>
        <div className='image-container'>
          <img className='event-image' src={event6} alt="" />
        </div>
      </div>
      <p>&copy; 2024 LePalefox. All rights reserved.</p>
    </footer>
  )
}

export default Footer
