"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const CheckoutPage: React.FC = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const planId = searchParams.get("planId");

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          planId,
          cardNumber,
          expiryDate,
          cvv,
        }),
      });

      if (response.ok) {
        setMessage("Payment successful!");
      } else {
        const errorData = await response.json();
        setMessage(`Payment failed: ${errorData.message}`);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log(`User ID: ${userId}, Plan ID: ${planId}`);
  }, [userId, planId]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-5">
      <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-8">
        Checkout
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg px-10 pt-8 pb-10 max-w-lg mx-auto"
      >
        <div className="mb-6">
          <label
            className="block text-gray-800 text-sm font-bold mb-2"
            htmlFor="cardNumber"
          >
            Card Number
          </label>
          <input
            type="text"
            id="cardNumber"
            placeholder="1234 5678 9012 3456"
            className="shadow-md appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-800 text-sm font-bold mb-2"
            htmlFor="expiryDate"
          >
            Expiry Date
          </label>
          <input
            type="text"
            id="expiryDate"
            placeholder="MM/YY"
            className="shadow-md appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-800 text-sm font-bold mb-2"
            htmlFor="cvv"
          >
            CVV
          </label>
          <input
            type="text"
            id="cvv"
            placeholder="123"
            className="shadow-md appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            disabled={isLoading}
            className={`${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
          >
            {isLoading ? "Processing..." : "Pay Now"}
          </button>
        </div>
      </form>
      {message && (
        <p className="text-center text-lg mt-6 text-gray-800 font-medium">
          {message}
        </p>
      )}
    </div>
  );
};

export default CheckoutPage;
