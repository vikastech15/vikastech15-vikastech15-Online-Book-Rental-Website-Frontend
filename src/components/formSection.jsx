
const FormSection = () => {
  return (
    <section className="contact h-[85vh] w-[96%] px-6 py-16 flex justify-between items-center ml-10 mr-10">
      <div className="content-left w-[55%] h-[30rem] relative">
        <h2 className="h2 mt-16 block text-4xl font-medium font-['Poetsen_One']">
          "Books On Desk – <br />
          &nbsp; One Platform, Infinite Possibilities"
        </h2>
        <p className="form-p my-4 mx-4 text-xl font-semibold text-[#5f0909] font-sans">
          Rent. Sell. Connect. A community built around stories. Join the journey.
        </p>
        <div className="social-icons mt-6">
          <i className="fa-brands fa-twitter text-4xl mr-5"></i>
          <i className="fa-brands fa-facebook text-4xl mr-5"></i>
          <i className="fa-brands fa-square-instagram text-4xl"></i>
        </div>
      </div>

      <div className="contact-form w-[40%] h-[30rem] p-8 bg-white rounded-lg shadow-xl">
        <form className="space-y-6">
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
            className="form-submit px-8 py-3 text-lg font-medium text-red-700 border-2 border-red-700 rounded-full hover:bg-red-700 hover:text-white transition-all duration-300 hover:shadow-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default FormSection;