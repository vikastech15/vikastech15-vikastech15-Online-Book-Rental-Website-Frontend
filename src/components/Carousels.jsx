import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "./Carousels.css";
// import "./carouselDiv.css"

export default function Carousels() {
  return (
    <div className="">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={96}
        slidesPerView={1}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        className="mySwiper"
        scrollbar={{ draggable: true }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        style={{ padding: "0 96px" }}
      >
        <SwiperSlide>
          <div className="slide red" key="1">
            <div className="text-content">
              <p className="browse-heading">Explore Books That Matter</p>
              <p className="browse-content text-black">
                “Thousands of books. Endless journeys. Begin yours today.”{" "}
                <br />
                “Don’t just read—discover. Every browse opens a new world.”{" "}
                <br />
                “Books you need. Stories you’ll love. All in one place.”
              </p>
            </div>
            <div className="img-content"></div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide green" key="2">
            <div className="text-content">
              <p className="browse-heading">Share, Sell, or Rent</p>
              <p className="browse-content text-black">
                “Own books? Turn them into opportunities—rent or sell
                effortlessly.” <br />
                “Your shelf could be someone’s treasure. List your books in
                seconds.” <br />
                “Let your books keep moving—share stories, earn smartly.”
              </p>
            </div>
            <div className="btn-content">
              <div className="connect-img"></div>
              <button className="btn1 btn">log in</button>
              <button className="btn2 btn">Sign Up</button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide blue" key="3">
            <div className="text-content">
              <p className="browse-heading">Read. Connect. Belong.</p>
              <p className="browse-content text-black">
                “More than readers—we’re a movement. Join the story.” <br />
                “Find your book tribe. Share notes, swap ideas, grow together.”{" "}
                <br />
                “Genres connect us, stories unite us—build your reader circle
                here.”
              </p>
            </div>
            <div className="img-content image2"></div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
