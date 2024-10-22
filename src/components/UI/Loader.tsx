import * as React from 'react'
// icons
import { FiLoader } from "react-icons/fi";

const Loader: React.FC = () => {
  return (
    <div className='w-full flex justify-center items-center mb-6'>
      <FiLoader className="text-[2.8rem] animate-spin text-[#3B9DF8]" />
    </div>
  );
};

export default Loader;
