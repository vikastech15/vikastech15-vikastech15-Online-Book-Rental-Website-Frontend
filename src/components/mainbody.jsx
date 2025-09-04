
import BookCarousel from "./bookCarousel";
import "./mainbody.css";
import About from "./About";
import Genre from "./Genre";
import { Element } from 'react-scroll';
const Mainbody = () => {
  return (
    <>

    <div className="main-body">

        <div className="main-about">

            <About/>

        </div>
        <Element name="chatbot-section">
        <div id="genre-box" className="genre-box">
            <Genre/>

        </div>
        </Element>

        <div className="book-novel book-cat">
            <a href="#novel" className="book-cat-name"> NOVEL</a>
            <BookCarousel/>

        </div>

        <div className="educational-book book-cat">
            <a href="#eduBook" className="book-cat-name"> EDUCATIONAL BOOK</a>
            <BookCarousel/>

        </div>

        <div className="trending-book  book-cat">
            <a href = "#trend" className="book-cat-name">TREANDING BOOKS</a>
            <BookCarousel/>

        </div>

        <div className="main-about">
        <p className="main-title"> Services We Are Providing! </p>

<div className="about-container">
<div className="about">
    <div className="about-img  img4">
    
    </div>
    <p className="img-title">
        FREE SHIPPING
    </p> 
    <p  className="img-detail">
        Enjoy hassle-free delivery with no extra charges. We make it easier for you to get the books you love—delivered right to your doorstep, absolutely free.
    </p>
</div>

<div className="about">
    <div className="about-img img6">
        
    </div>

    <p className="img-title">
        USER LISTING
    </p> 
    <p  className="img-detail">
         List your books in just a few steps! Whether you're selling or renting, our simple system helps your books find the right readers fast.
    </p>
</div>

</div>

            


        </div>

       
    </div>
    
    
    
    </>

  )
}
export default Mainbody;