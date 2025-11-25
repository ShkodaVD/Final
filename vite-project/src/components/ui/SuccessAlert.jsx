import React from 'react';

export default function SuccessAlert({ isOpen, onClose }){
  // если не открыто не выводим
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl max-w-sm w-full mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            Congratulations!
          </h2>
          
          <div className="text-gray-700 space-y-2">
            <p className="text-lg">Your order has been successfully placed</p>
            <p className="text-lg">on the website.</p>
            <p className="text-lg">A manager will contact you shortly</p>
            <p className="text-lg">to confirm your order.</p>
          </div>
          <button
            onClick={onClose}
            className="mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};
