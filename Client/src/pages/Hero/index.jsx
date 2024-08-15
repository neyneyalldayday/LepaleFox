import image from '../../assets/image.jpg'
import './hero.css'
const Hero = () => {
  return (
    <div className='hero-container'>
      <img id="hero" src={image} alt="" />
      <div className='hero-content'>
      <h1><span class="animated-char">L</span><span class="animated-char">e</span><span class="animated-char">P</span><span class="animated-char">a</span><span class="animated-char">l</span><span class="animated-char">e</span><span class="animated-char">f</span><span class="animated-char">o</span><span class="animated-char">x</span></h1>
      </div>
    </div>
  )
}

export default Hero