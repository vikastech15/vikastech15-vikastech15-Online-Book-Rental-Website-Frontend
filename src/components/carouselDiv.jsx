
import "./carouselDiv.css"
const Slides = () => {
  return [
    <div className="slide red" key="1">

        <div className="text-content">
            <p className="browse-heading">Explore Books That Matter</p>
            <p className="browse-content">
            “Thousands of books. Endless journeys. Begin yours today.”  <br />
            “Don’t just read—discover. Every browse opens a new world.” <br />
            “Books you need. Stories you’ll love. All in one place.”
            </p>

        </div>
    </div>,
    <div className="slide green" key="2">
        

         <div className="connect-text">
            <p className="browse-heading">Share, Sell, or Rent</p>
            <p className="browse-content">
            “Own books? Turn them into opportunities: rent-sell effortlessly.”  <br />
            “Your shelf could be someone’s treasure. List your books in seconds.” <br />
            “Let your books keep moving—share stories, earn smartly.”
            </p>

               <button className="btn-connect">
                   Connect With Us
                </button>   


        </div>

        
       

    </div>,
    <div className="slide blue" key="3">

        <div className="img-content image2"> 

       </div>
         <div className="community-content">
            <p className="browse-heading">Read. Connect. Belong.</p>
            <p className="browse-content">
            “More than readers—we’re a movement. Join the story.” <br />
            “Find your book tribe. Share notes, swap ideas, grow together.” <br />
            “Genres connect us, stories unite us—build your reader circle here.”
            </p>

        </div>
        
    </div>,
  ];
};

export default Slides;
