import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface CartSummaryProps {
  handleRemoveOneItem: () => void;
  handleClearItems: () => void;
};

const CartSummary: React.FC<CartSummaryProps> = ({ handleRemoveOneItem, handleClearItems }) => {
  // Access the cart summary using useSelector
  const totalQuantity = useSelector((state: RootState) => state.cart.totalQuantity);
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);

  return (
    <div className="bg-blue-50 w-fit justify-between rounded-xl px-3">

      {/* Cart Summary */}
      <div className="text-center">
        <h1 className="text-[1rem] lg:text-[1.3rem] font-bold text-blue-800">Cart Summary</h1>
      </div>

      <div className="flex justify-between gap-3">
        <p className="text-[0.9rem] lg:text-[1.1rem] text-gray-500">
          <span>Total Items:</span> <span className="text-green-600 font-semibold">{totalQuantity}</span>
        </p>
        <p className="text-[0.9rem] lg:text-[1.1rem] text-gray-500">
          <span>Price:</span> <span className="text-red-600 font-semibold">${totalPrice.toFixed(2)}</span>
        </p>
      </div>

      <div className="flex justify-between mt-1 mb-2">
        <button
          onClick={handleRemoveOneItem}
          className="w-fit px-3 py-0 border rounded-md text-orange-500"
        >
          Remove 1
        </button>
        <button
          onClick={handleClearItems}
          className="w-fit px-3 py-0 border rounded-md text-orange-500"
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
