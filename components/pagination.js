
import React from 'react';

const Pagination = ({ backward, forward,lastVisibleRecord }) => {
  return (
    <div className=" flex items-center justify-center mt-4 space-x-3">
      <button disabled={lastVisibleRecord.length} onClick={backward} className="bg-[#215Bf0] text-white font-bold py-2 px-4 rounded w-[150px]">
        <i className="fa-solid fa-angles-left mr-3"></i>
        Previous
      </button>
      <button onClick={forward} className="bg-[#215Bf0] text-white font-bold py-2 px-4 rounded w-[150px]">
        Next
        <i className="fa-solid fa-angles-right ml-3"></i>
      </button>
    </div>
  );
};

export default Pagination;