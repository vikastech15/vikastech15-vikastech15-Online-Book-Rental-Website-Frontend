


import { useState, useEffect } from 'react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState('stats'); // 'stats' or 'testimonial'

     const features = [
    {
      icon: "📚",
      title: "Vast Collection",
      description: "Thousands of books across all genres"
    },
    {
      icon: "💰",
      title: "Affordable Prices",
      description: "Rent or buy at unbeatable prices"
    },
    {
      icon: "🚚",
      title: "Fast Delivery",
      description: "Quick shipping to your doorstep"
    },
    {
      icon: "🔄",
      title: "Easy Returns",
      description: "Simple return process for rentals"
    }
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className={`text-center mb-8 sm:mb-12 lg:mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
            About <span className="text-blue-600">Book on Desk</span>
          </h1>
          <div className="w-16 sm:w-20 lg:w-24 h-1 bg-blue-600 mx-auto mb-6 sm:mb-8 rounded-full"></div>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Your trusted partner in the world of books - making reading accessible, 
            affordable, and enjoyable for everyone.
          </p>
        </div>

        {/* Main Content with Interactive Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center mb-12 sm:mb-16 lg:mb-20">
          {/* Left Side - Interactive Cards */}
          <div className={`order-2 lg:order-1 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <div className="relative mx-auto max-w-md lg:max-w-full h-64 sm:h-72 md:h-80 lg:h-96">
              
              {/* Flip Container */}
              <div className="relative w-full h-full perspective-1000"  onClick={() => setActiveCard(activeCard === 'stats' ? 'testimonial' : 'stats')}>
                {/* Stats Card (Front) */}
                <div className={`absolute w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
                  activeCard === 'testimonial' ? 'rotate-y-180' : ''
                }`}>
                  <div className="absolute w-full h-full bg-white rounded-2xl shadow-2xl backface-hidden p-6 sm:p-8 flex flex-col justify-center">
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 text-center">
                      Our Impact in Numbers
                    </h3>
                    <div className="grid grid-cols-2 gap-4 sm:gap-6">
                      <div className="text-center">
                        <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">10K+</div>
                        <div className="text-sm sm:text-base text-gray-600">Books Available</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-2">50K+</div>
                        <div className="text-sm sm:text-base text-gray-600">Happy Readers</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl sm:text-4xl font-bold text-purple-600 mb-2">95%</div>
                        <div className="text-sm sm:text-base text-gray-600">Satisfaction Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl sm:text-4xl font-bold text-orange-600 mb-2">24/7</div>
                        <div className="text-sm sm:text-base text-gray-600">Support</div>
                      </div>
                    </div>
                  </div>

                  {/* Testimonial Card (Back) */}
                  <div className="absolute w-full h-full bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl shadow-2xl backface-hidden rotate-y-180 p-6 sm:p-8 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-4xl mb-4">{"(> _ <)"}</div>
                      <p className="text-lg sm:text-xl font-medium mb-4">
                        Book on Desk saved me hundreds on textbooks! Best platform for students.
                      </p>
                      <div className="font-semibold">- Sarah, College Student</div>
                      <div className="flex justify-center mt-2">
                        {'⭐'.repeat(5)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Dots */}
              <div className="flex justify-center mt-6 space-x-3">
                <button
                  onClick={() => setActiveCard('stats')}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeCard === 'stats' ? 'bg-blue-600 w-8' : 'bg-gray-300'
                  }`}
                />
                <button
                  onClick={() => setActiveCard('testimonial')}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeCard === 'testimonial' ? 'bg-pink-600 w-8' : 'bg-gray-300'
                  }`}
                />
              </div>

        
            </div>
          </div>

          {/* Right Side - Text */}
          <div className={`order-1 lg:order-2 space-y-4 sm:space-y-6 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center lg:text-left">
              Our Story
            </h2>
            <div className="space-y-4">
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed text-center lg:text-left">
                Book on Desk was born from a simple idea: to make books more accessible 
                to everyone. We believe that reading should be affordable and convenient, 
                whether you're a student, a professional, or a casual reader.
              </p>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed text-center lg:text-left">
                Our platform connects book lovers with a vast collection of titles, 
                allowing you to rent books for a specific period or purchase them 
                outright. We're committed to promoting sustainable reading habits 
                by encouraging book sharing and reuse.
              </p>
            </div>
            
            {/* Key Benefits */}
            <div className="bg-blue-50 rounded-xl p-4 sm:p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Why Choose Us?</h4>
              <ul className="space-y-2 text-sm sm:text-base text-gray-600">
                <li>✅ Save up to 70% compared to buying new</li>
                <li>✅ Eco-friendly book sharing community</li>
                <li>✅ Free delivery on orders over $25</li>
                <li>✅ 30-day easy return policy</li>
              </ul>
            </div>
          </div>

        </div>
        <br></br>
         <div className="mb-12 sm:mb-16 lg:mb-20">
         <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 sm:mb-10 lg:mb-12">
           Why Choose Book on Desk?
         </h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`bg-white p-4 sm:p-5 lg:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 sm:hover:-translate-y-2 border border-gray-100 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{
                  transitionDelay: `${700 + index * 200}ms`
                }}
              >
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 text-center">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 text-center">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Add this to your Tailwind config or use CSS */}
        <style jsx>{`
          .perspective-1000 {
            perspective: 1000px;
          }
          .transform-style-preserve-3d {
            transform-style: preserve-3d;
          }
          .backface-hidden {
            backface-visibility: hidden;
          }
          .rotate-y-180 {
            transform: rotateY(180deg);
          }
        `}</style>
      </div>
    </div>
  );
};

export default About;
