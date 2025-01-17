import React, { useState } from 'react';

const PaymentPage = () => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });
      const data = await response.json();

      if (data.success) {
        const options = {
          key: process.env.RAZORPAY_KEY,
          amount: data.order_id * 100,
          currency: 'INR',
          name: 'Your Company Name',
          description: 'Payment for Your Product/Service',
          order_id: data.order_id,
          handler: function (response) {
            alert('Payment successful!');          },
          prefill: {
            name: user_name,
            email: user_email,
            contact: user_mobile,
          },
          theme: {
            color: '#F37254',
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } else {
        alert('Failed to create order. Try again!');
      }
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      alert('An error occurred. Please try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">Make a Payment</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Amount (INR):</label>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          onClick={handlePayment}
          disabled={loading}
          className={`w-full py-3 text-white font-semibold rounded-md ${loading ? 'bg-gray-400' : 'bg-orange-500 hover:bg-orange-600'}`}
        >
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
