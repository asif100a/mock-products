import * as React from "react";

const CartSummary: React.FC = () => {

  return (
    <div className="bg-blue-50 w-fit justify-between rounded-xl px-3">

      {/* Cart Summary */}
      <div className="text-center">
        <h1 className="text-[1rem] lg:text-[1.3rem] font-bold text-blue-800">Cart Summary</h1>
      </div>

      <div className="flex justify-between gap-3">
        <p className="text-[0.9rem] lg:text-[1.1rem] text-gray-500">
          <span>Total Items:</span> <span className="text-green-600 font-semibold">10</span>
        </p>
        <p className="text-[0.9rem] lg:text-[1.1rem] text-gray-500">
          <span>Price:</span> <span className="text-red-600 font-semibold">$70</span>
        </p>
      </div>
    </div>
  );
};

export default CartSummary;
