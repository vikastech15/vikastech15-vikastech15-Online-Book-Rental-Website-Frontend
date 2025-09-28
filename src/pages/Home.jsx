import './Home.css';
import Navbar from '../components/navbar'
import  Carousel from '../components/carousel'
import Mainbody from '../components/mainbody';
import Footer from '../components/footer';
import FormSection from '../components/formSection';
import ChatBot from '../components/ChatBot';
import About from '../components/About';
const home = () => {
  return (

    <>
      <Navbar/>
    <Carousel/>
      <About/>
   
    <div className='form-input mb-8'>
      <FormSection/>

    </div>
   
    <div className='Chat-bot'>

       <ChatBot/>
    </div>
    
          

    </>
  )
}

export default home

