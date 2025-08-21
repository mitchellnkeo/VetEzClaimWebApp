import React from 'react';

export default function Card() {
  return (
    <div className="w-full max-w-[18rem] rounded border border-white-light bg-[#3b3f5c] p-5 shadow-[4px_6px_10px_-3px_#bfc9d4] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
      <div className="text-center text-black-light">
        <div className="mx-auto mb-5 h-20 w-20 overflow-hidden rounded-full">
          <img
            src="/assets/images/profile-34.jpeg"
            alt="profile"
            className="h-full w-full object-cover"
          />
        </div>
        <h5 className="mb-2 text-[15px] font-semibold text-white">Jacob W.</h5>
        <div className="flex items-center justify-center">
          <p className="font-bold">Long Beach, CA </p>
          <p className="ml-2 font-thin"> | 35 Reviews</p>
        </div>
        <p className="mt-2 text-info-light">30 Min Response</p>
        <div className="my-2 flex items-center justify-center text-[#e2a03f]">
          ★★★★★
          <span className="badge badge-outline-info ml-3 rounded-full capitalize hover:top-0 hover:bg-primary   hover:text-white">
            Barbar
          </span>
        </div>
        <p className="font-semibold italic">
          “Jacob from the app provides the perfect cut every time, right at my
          doorstep!”
        </p>
        <button type="button" className="btn btn-primary btn-sm mx-auto mt-2">
          Book Now
        </button>
      </div>
    </div>
  );
}
