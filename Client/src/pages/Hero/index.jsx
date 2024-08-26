import image from '../../assets/idk-what-i-did.png'
import './hero.css'
const Hero = () => {
  return (
    <div className='hero-container'>
      <img id="hero" src={image} alt="" />
      <div className='hero-content'>
      <h1><span className="animated-char">L</span><span className="animated-char">e</span><span className="animated-char">P</span><span className="animated-char">a</span><span className="animated-char">l</span><span className="animated-char">e</span><span className="animated-char">f</span><span className="animated-char">o</span><span className="animated-char">x</span></h1>
      </div>
    </div>
  )
}

export default Hero