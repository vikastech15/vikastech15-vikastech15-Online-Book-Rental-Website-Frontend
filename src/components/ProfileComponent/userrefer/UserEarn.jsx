import React, { useState } from 'react';
import { FaCopy, FaShareAlt, FaBook, FaMoneyBillWave, FaUserFriends } from 'react-icons/fa';
import { FiCheckCircle } from 'react-icons/fi';

const ReferAndEarn = () => {
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState('');
  const [emailsSent, setEmailsSent] = useState(false);

  // This would typically come from user data
  const referralCode = "BOOKLOVER25";
  const referralLink = `https://www.bookrental.com/signup?ref=${referralCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendEmails = (e) => {
    e.preventDefault();
    // Here you would typically send the emails via an API
    console.log('Sending referral emails to:', email);
    setEmailsSent(true);
    setEmail('');
    setTimeout(() => setEmailsSent(false), 3000);
  };

  const shareViaSocial = (platform) => {
    // Implement social sharing functionality
    console.log(`Sharing via ${platform}`);
    // Actual implementation would use platform-specific APIs
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Refer Friends & Earn Rewards
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Share your love for books and get free rental credits for every friend who joins!
          </p>
        </div>

        {/* Rewards Section */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 p-4 rounded-full mb-3">
                <FaShareAlt className="text-blue-600 text-2xl" />
              </div>
              <h3 className="font-semibold text-lg mb-1">1. Share Your Link</h3>
              <p className="text-gray-600">Share your unique referral link with friends</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-green-100 p-4 rounded-full mb-3">
                <FaUserFriends className="text-green-600 text-2xl" />
              </div>
              <h3 className="font-semibold text-lg mb-1">2. Friends Sign Up</h3>
              <p className="text-gray-600">Your friends sign up using your link</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-purple-100 p-4 rounded-full mb-3">
                <FaMoneyBillWave className="text-purple-600 text-2xl" />
              </div>
              <h3 className="font-semibold text-lg mb-1">3. You Both Earn</h3>
              <p className="text-gray-600">You both get free rental credits</p>
            </div>
          </div>
        </div>

        {/* Referral Link Section */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Referral Link</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-grow bg-gray-100 p-3 rounded-md overflow-x-auto">
              <code className="text-gray-800">{referralLink}</code>
            </div>
            <button
              onClick={copyToClipboard}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 min-w-[120px]"
            >
              {copied ? (
                <>
                  <FiCheckCircle /> Copied!
                </>
              ) : (
                <>
                  <FaCopy /> Copy
                </>
              )}
            </button>
          </div>
        </div>

        {/* Email Referral Section */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Invite via Email</h2>
          <form onSubmit={handleSendEmails} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter friend's email addresses (comma separated)"
              className="flex-grow border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
            >
              Send Invite
            </button>
          </form>
          {emailsSent && (
            <div className="mt-3 text-green-600 flex items-center gap-2">
              <FiCheckCircle /> Invitations sent successfully!
            </div>
          )}
        </div>

        {/* Social Sharing Section */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Share on Social Media</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => shareViaSocial('facebook')}
              className="bg-[#3b5998] hover:bg-[#344e86] text-white px-4 py-2 rounded-md flex items-center gap-2"
            >
              <FaShareAlt /> Facebook
            </button>
            <button
              onClick={() => shareViaSocial('twitter')}
              className="bg-[#1da1f2] hover:bg-[#1991db] text-white px-4 py-2 rounded-md flex items-center gap-2"
            >
              <FaShareAlt /> Twitter
            </button>
            <button
              onClick={() => shareViaSocial('whatsapp')}
              className="bg-[#25d366] hover:bg-[#20bd5a] text-white px-4 py-2 rounded-md flex items-center gap-2"
            >
              <FaShareAlt /> WhatsApp
            </button>
            <button
              onClick={() => shareViaSocial('linkedin')}
              className="bg-[#0077b5] hover:bg-[#00669c] text-white px-4 py-2 rounded-md flex items-center gap-2"
            >
              <FaShareAlt /> LinkedIn
            </button>
          </div>
        </div>

        {/* Rewards Details */}
        
      </div>
    </div>
  );
};

export default ReferAndEarn;