// 

// components/PaymentCard.js
import React from 'react';

const PaymentCard = ({ logoSrc, system, limit, processingTime, fee, onClick }) => {
  return (
    <div 
    onClick={onClick}
    className="max-w-md mx-auto mt-8 p-4 bg-white rounded-md shadow-md">
      <img src={logoSrc} alt={`${system} Logo`} className=" mb-4 h-8" />
      <h2 className="text-xl font-semibold mb-2 border-b">{system}</h2>
      <p>
        <span className="font-bold">Limit:</span> {limit}
      </p>
      <p>
        <span className="font-bold">Processing Time:</span> {processingTime}
      </p>
      <p>
        <span className="font-bold">Fee:</span> {fee}
      </p>
    </div>
  );
};

export default PaymentCard;
