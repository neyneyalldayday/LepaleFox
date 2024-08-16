import React, { useRef, useEffect } from 'react';
import emailjs from 'emailjs-com';
import './contact.css';
import image2 from '../../assets/image2.jpg'

const Contact = () => {
    const formRef = useRef();
    useEffect(() => {
        // Initialize EmailJS with your user ID
        emailjs.init('iJaR9zspjdomC9XL2');
    }, []);
    const sendEmail = (e) => {
      e.preventDefault();
        
   

      emailjs.sendForm('service_yd9p1np', 'template_pbzaykh', formRef.current)
        .then((result) => {
            console.log("your message was sent daddy ",result.text);
            formRef.current.reset();
        }, (error) => {
            console.log(error.text);
        });
    }

  return (
    <>
    <div className='image-container'>
      <img  className="contact-image" src={image2} alt="" />
      <div className='contact-heading'>
        <h1>Send Me A Message</h1>
      </div>     
    </div>
    <form className="contact-form" ref={formRef} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="user_name" />

      <label>Email</label>
      <input type="email" name="user_email" />

      <label>Message</label>
      <textarea name="message" />

      <input type="submit" value="Send" />
    </form>
    </>
  )
}

export default Contact