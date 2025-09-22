import React from "react";
import ReactDOM from "react-dom";
import Router from "next/router"; // import Router for navigation

export default function SubscriptionRequired() {
  const onSubscribeClick = () => {
    Router.push("/subscription");
  };

  const onHomeClick = () => {
    Router.push("/");
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <h2 className="text-xl font-bold mb-4 text-gray-900">
          You are not subscribed
        </h2>
        <p className="text-gray-600 mb-6">
          Please subscribe to unlock all features.
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={onSubscribeClick}
            className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primaryHover transition-colors"
          >
            Subscribe Now
          </button>
          <button
            onClick={onHomeClick}
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Home
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
