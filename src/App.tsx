import React, { ChangeEvent, useState, useEffect } from "react";
import "./App.css";
import { optionType, forecastType } from "./types";
import Search from "./components/Search";
import Display from "./components/Display";

function App(): JSX.Element {
  //city in the searchbar
  const [city, setCity] = useState<string>("");
  //selectedOption
  const [selectedOption, setSelectedOption] = useState<optionType | null>(null);
  //options in the dropdown
  const [options, setOptions] = useState<[]>([]);
  //forecast data
  const [forecast, setForecast] = useState<forecastType | null>(null);

  //*----------------------when you type into searchbar------------------------
  async function getSearchOptions(value: string) {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${
        process.env.REACT_APP_API_KEY
      }`
    );
    const data = await response.json();
    setOptions(data);
  }

  async function getWeather(option: optionType) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${option.lat}&lon=${option.lon}&appid=${process.env.REACT_APP_API_KEY}`
    );
    const data = await response.json();
    console.log(data);
    const relevantData = {
      ...data.city,
      list: data.list.slice(0, 16),
    };
    setForecast(relevantData);
  }

  function onInputChange(e: ChangeEvent<HTMLInputElement>): void {
    const value = e.target.value.trim();
    // console.log(value);
    setCity(value);
    if (value === "") {
      setOptions([]);
      return;
    }
    getSearchOptions(value);
  }
  //*----------------------when you click on one of the options------------------------
  function onSelectOption(option: optionType) {
    console.log(option.name);
    setSelectedOption(option);
  }

  //*--------this runs when you click on one of the options----------------------
  useEffect(() => {
    if (selectedOption) {
      //put the official name in the searchbar input. So it will be capitalized, correct spelling, instead of whatever the user may have typed
      setCity(selectedOption.name);
      //clear the dropdown
      setOptions([]);
    }
  }, [selectedOption]);

  function onSubmit() {
    if (!selectedOption) return;
    getWeather(selectedOption);
  }

  return (
    <div className="h-full min-h-[100vh] w-full flex justify-center items-center bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400  ">
      {forecast ? (
        <Display data={forecast}></Display>
      ) : (
        <Search
          {...{ city, options, onInputChange, onSelectOption, onSubmit }}
        ></Search>
      )}
    </div>
  );
}

export default App;
