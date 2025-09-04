import React, { useState } from 'react';
import {FaBook, FaUserFriends } from 'react-icons/fa';

const Credit = () => {
 

  return (
    <div className="bg-white shadow rounded-lg p-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-12">Your Rewards 🪙</h2>
    <div className="grid md:grid-cols-2 gap-6">
      <div className="border border-gray-200 rounded-lg p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-blue-100 p-3 rounded-full">
            <FaBook className="text-blue-600" />
          </div>
          <h3 className="font-semibold text-lg mb-">Current Credits</h3>
        </div>
        <p className="text-3xl font-bold text-gray-800">0</p>
        <p className="text-gray-600 mt-1">Free rental credits</p>
      </div>
      <div className="border border-gray-200 rounded-lg p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-green-100 p-3 rounded-full">
            <FaUserFriends className="text-green-600" />
          </div>
          <h3 className="font-semibold text-lg">Friends Referred</h3>
        </div>
        <p className="text-3xl font-bold text-gray-800">0</p>
        <p className="text-gray-600 mt-1">Successful referrals</p>
      </div>
    </div>
    <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
      <h3 className="font-semibold text-lg text-yellow-800 mb-2">How rewards work</h3>
      <ul className="list-disc list-inside text-yellow-700 space-y-1">
        <li>You get 1 free rental credit for each friend who signs up</li>
        <li>Your friend gets 1 free rental credit when they sign up</li>
        <li>Credits expire after 90 days</li>
        <li>Maximum of 20 credits per year from referrals</li>
      </ul>
    </div>
  </div>
  );
};

export default Credit;