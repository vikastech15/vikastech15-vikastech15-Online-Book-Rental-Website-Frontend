

.red
{
    background-image: url("./carousel/book1.jpg");
    background-position-y: center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
}

.text-content
{
    width: 60%;
    height: 70%;
    font-weight: 400;
    font-style: normal;
    background-color: rgba(226, 217, 217, 0.89);

}

.browse-heading
{
    color: rgb(20,42,23);
    font-size: 50px;
    font-family: "Special Gothic Expanded One", sans-serif;
    font-weight: 500;
    font-style: normal;
}
.browse-content
{
    padding: 16 6px;
    color: rgb(169,127,57);
    /* color: rgb(0, 216, 249); */
    font-size: 20px;
    font-weight: 650;
}


.btn-connect
{
    margin-top: 40px;
    border: 2px solid rgb(255, 166, 111);
    border-radius: 7px;
    /* background-color: rgb(233, 206, 206); */
    /* background-color: rgb(255, 215, 215); */

    color: rgb(92, 11, 11);
    font-weight: 500;
    background: linear-gradient(to right, rgb(255, 228, 191) 50%, #ffaa83 50%);
    background-size: 200% 100%;
    background-position: left bottom;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    transition: background-position 0.5s ease-in;

  
}

.btn-connect:hover{
    background-position: right bottom;
    /* box-shadow: 0 0 15px 4px #ff8e38; */
    /* transition: transform 0.2s ease-in; */
    transform: scale(1.02);
}

.green
{
   /* border: 5px solid white; */
   background-image: url("./carousel/book2.jpg");
   background-size: cover;
   background-repeat: no-repeat;


    background-position-y: center;
    display: flex;
    justify-content: center;
}


.connect-text
{
    width: 49%;
    height: 95%;
    background-color: rgba(226, 217, 217, 0.89);
    font-weight: 400;
    font-style: normal;
    text-align: center;
}

.btn
{
    margin: 8px 40px ;
    padding: 10px 14px;
    width: 16rem;
    border: 4px solid rgb(10, 4, 160);
    border-radius: 60px;
    background-color:rgb(255, 224, 224);
    color: rgb(255, 245, 245);
    font-size: 25px;
    font-weight: 800;
    font-family: "Playfair Display", serif;
    font-optical-sizing: auto;
    /* font-weight: <weight>; */
    font-style: normal;
}

.blue
{
    background-image: url("./carousel/book3.jpg");
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
}

.community-content
{
    padding-top: 50px;
    width: 70%;
    height: 60%;
    /* border: 3px solid rgb(141, 29, 29); */
    font-weight: 400;
    font-style: normal;
    text-align: center;
     background-color: rgba(226, 217, 217, 0.89);
    
    
}


form sectipn



const FormSection = () => {
  return (
    // <section className="contact h-[85vh] w-[96%] px-6 py-16 flex justify-between items-center ml-10 mr-10">
    //   <div className="content-left w-[55%] h-[30rem] relative">
    <section className="contact h-[85vh] w-[100%]  flex justify-around items-center 
                    flex-col lg:flex-row mb-[15%]  ">
  <div className="content-left pb-2.5 w-full bg-red-300 lg:w-[40vw] h-[30rem] relative pl-[5%]  mb-8 lg:mb-0">
        <h2 className="h2 mt-16 block text-4xl font-medium font-['Poetsen_One']">
          "Books On Desk – <br />One Platform, Infinite Possibilities"
        </h2>
        <p className="form-p my-4  text-xl font-semibold text-[#5f0909] font-sans">
          Rent. Sell. Connect. A community built around stories. Join the journey.
        </p>
        <div className="social-icons mt-6">
          <i className="fa-brands fa-twitter text-4xl mr-5"></i>
          <i className="fa-brands fa-facebook text-4xl mr-5"></i>
          <i className="fa-brands fa-square-instagram text-4xl"></i>
        </div>
      </div>

      {/* <div className="contact-form w-[40%] h-[30rem] p-8 bg-white rounded-lg shadow-xl"> */}
      <div className="contact-form h-[70%] w-max-[70vw] w-[60%] lg:w-[40vw]  p-8 bg-white rounded-lg shadow-xl">
        <form className="">
          <div className="grid grid-cols-2 gap-6">
            <div className="relative">
              <input
                type="text"
                id="first_name"
                className="block w-full px-0 pt-3 pb-2 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-700 peer"
                placeholder="John"
                required
              />
              <label
                htmlFor="first_name"
                className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                First Name
              </label>
            </div>
            <div className="relative">
              <input
                type="text"
                id="last_name"
                className="block w-full px-0 pt-3 pb-2 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-700 peer"
                placeholder="Doe"
                required
              />
              <label
                htmlFor="last_name"
                className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Last Name
              </label>
            </div>
          </div>

          <div className="relative">
            <input
              type="email"
              id="email"
              className="block w-full px-0 pt-3 pb-2 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-700 peer"
              placeholder="john@example.com"
              required
            />
            <label
              htmlFor="email"
              className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email Address
            </label>
          </div>

          <div className="relative">
            <textarea
              id="message"
              rows="4"
              className="block w-full px-0 pt-3 pb-2 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-700 peer"
              placeholder="Your message here..."
              required
            ></textarea>
            <label
              htmlFor="message"
              className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Your Message
            </label>
          </div>

          <button
            type="submit"
            className="form-submit px-8 py-3 text-lg mt-[2%] font-medium text-red-700 border-2 border-red-700 rounded-full hover:bg-red-700 hover:text-white transition-all duration-300 hover:shadow-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default FormSection;

