import React, { ChangeEvent, useState, useEffect } from "react";

import { optionType } from "../types";

//yes.. we have to define the type for each prop. Again.
type Props = {
  city: string;
  options: [];
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSelectOption: (option: optionType) => void;
  onSubmit: () => void;
};

const Search = ({
  city,
  options,
  onInputChange,
  onSelectOption,
  onSubmit,
}: Props) => {
  return (
    <section className="w-full h-full lg:h-[500px] md:max-w-[500px] p-4 flex flex-col text-center items-center justify-center md:px-10 lg:p-24 bg-white bg-opacity-20 backdrop-blur-lg drop-shadow-lg rounded text-zinc-700">
      <h1 className="text-4xl font-thin">
        Weather <span className="font-black">Forecast</span>
      </h1>
      <p className="text-sm mt-2">
        Enter below a place you want to know the weather of and select an option
        from the dropdown
      </p>

      <div className="relative flex mt-10 md:mt-4">
        <input
          type="text"
          value={city}
          className="px-2 py-1 rounded-l border-2 border-white"
          onChange={onInputChange}
        />
        {/*------------ dropdown list of options --------------------*/}
        <ul className="absolute top-9 bg-white ml-1 rounded-b-md">
          {options.map((option: optionType, i: number) => {
            return (
              <li key={i}>
                <button
                  className="text-left text-sm w-full hover:bg-zinc-700 hover:text-white px-2 py-1 cursor-pointer"
                  onClick={() => onSelectOption(option)}
                >
                  {option.name}
                </button>
              </li>
            );
          })}
        </ul>
        <button
          className="rounded-r border-2 border-zinc-100 hover:border-zinc-500 hover:text-zinc-500 text-zinc-100 px-2 py-1 cursor-pointer"
          onClick={onSubmit}
        >
          search
        </button>
      </div>
    </section>
  );
};

export default Search;
