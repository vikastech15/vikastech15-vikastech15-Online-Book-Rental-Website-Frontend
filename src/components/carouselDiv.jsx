
import "./carouselDiv.css"
const Slides = () => {
  return [
    <div className="slide red" key="1">

        <div className="text-content flex flex-col items-center justify-center">
            <p className="browse-heading text-center">Explore Books That Matter</p>
            <p className="browse-content hidden md:block">
            “Thousands of books. Endless journeys. Begin yours today.”  <br />
            “Don’t just read—discover. Every browse opens a new world.” <br />
            “Books you need. Stories you’ll love. All in one place.”
            </p>

        </div>
    </div>,
    <div className="slide green" key="2">
        

         <div className="connect-text flex flex-col items-center justify-center">
            <p className="browse-heading text-center">Share, Sell, or Rent</p>
            <p className="browse-content hidden md:block">
            “Own books? Turn them into opportunities: rent-sell effortlessly.”  <br />
            “Your shelf could be someone’s treasure. List your books in seconds.” <br />
            “Let your books keep moving—share stories, earn smartly.”
            </p>

               <button className="btn-connect  text-md p-2.5">
                   Connect With Us
                </button>   


        </div>

        
       

    </div>,
    <div className="slide blue" key="3">

         <div className="community-content flex flex-col items-center justify-center">
            <p className="browse-heading text-center">Read. Connect. Belong.</p>
            <p className="browse-content hidden md:block">
            “More than readers—we’re a movement. Join the story.” <br />
            “Find your book tribe. Share notes, swap ideas, grow together.” <br />
            “Genres connect us, stories unite us—build your reader circle here.”
            </p>

        </div>
        
    </div>,
  ];
};

export default Slides;
