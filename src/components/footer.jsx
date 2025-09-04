import React from "react";
import "./footer.css";
const Footer = () => {
  return (

    <>
    
       <footer>

        <p className="footer-heading">Feel Free! to contact us everytime between 10:00 AM and 10:00 PM</p>
        <div className="footer-container">

          <div className="footer-content content1">
          <a className="titlee" href="/">
                BooksOnDesk
          </a>

          <p className="text-sm"> <br />
           
           At BookOnDesk, we believe stories should be accessible to everyone. Rent your favorite books for a fraction of the cost, discover new worlds, and return them when you're done  no clutter, no commitment, just endless reading joy. </p>

          </div>
          <div className="footer-content">
             <p className="content2">
                RESOURCES
             </p>
             <p className="c1">  
                FAQ </p> 
                <p  className="c2">
                Partner With Us  </p>
                <p  className="c3">
                Pricing                
             </p>

          </div>
          <div className="footer-content">
             <p className="content2">
                CONTACT
             </p>
              <p  className="c2">
                bookondesk@gmail.com  </p>
             <p className="c1">  
                6307774746 </p> 
               
                

          </div>

        </div>


        <div className="footer-end ">
          <div className="end-content">
          <p className="p1"> @copyright</p> <p className="p2">Privacy Policies </p>  <p className="p3">Terms and Conditions</p>
          </div>

        </div>


       </footer>
    
    
    </>
  )
}

export default Footer;