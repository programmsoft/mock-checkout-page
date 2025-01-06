import React from "react";
import Link from "next/link";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Welcome to Our Store
      </h1>
      <p className="text-lg text-gray-600 mb-4">
        Your journey to seamless payments starts here.
      </p>
      <Link href="/checkout">
        <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Go to Checkout
        </div>
      </Link>
    </div>
  );
};

export default HomePage;
