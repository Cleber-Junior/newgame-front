import React from "react";

const GenericSelect = ({ options, onSelect }) => {
  return (
    <div class="w-full max-w-sm min-w-[200px]">
      <div class="relative">
        <select
          name="state"
          onChange={(e) => onSelect(e.target.value)}
          class="w-full text-slate-700 text-sm border border-gray-300 rounded pl-3 pr-8 py-2  duration-300  focus:border-green-500 hover:border-green-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none cursor-pointer"
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.sigla}
            </option>
          ))}
        </select>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.2"
          stroke="currentColor"
          class="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
          />
        </svg>
      </div>
    </div>
  );
};

export default GenericSelect;
