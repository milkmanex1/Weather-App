import React, { ChangeEvent, useState, useEffect } from "react";
import { forecastType } from "../types";
import Sunrise from "./Icons/Sunrise";
import Sunset from "./Icons/Sunset";
import {
  getHumidityValue,
  getPop,
  getSunTime,
  getVisibilityValue,
  getWindDirection,
} from "../helpers";
import Tile from "./Tile";
type Props = {
  data: forecastType;
};
//not sure why I have to define the prop type like that, normally its shorter
function Degree({ temp }: { temp: number }): JSX.Element {
  return (
    <span>
      {Math.round(temp - 273.15)} <sup>o</sup>
    </span>
  );
}

const Display = ({ data }: Props) => {
  const today = data.list[0];
  console.log(getSunTime(data.sunrise));

  return (
    <div className="w-full md:max-w-[500px] py-4 md:py-4 md:px-10 lg:px-24 h-full lg:h-auto bg-white bg-opacity-20 backdrop-blur-ls rounded drop-shadow-lg">
      <div className="mx-auto w-[300px]">
        <section className="text-center">
          <h2 className="text-2xl font-black">
            {data.name}, <span className="font-thin">{data.country}</span>
          </h2>
          <h1 className="text-4xl font-extrabold">
            <Degree temp={Math.round(today.main.temp)}></Degree>
          </h1>
          <p className="text-sm">
            {today.weather[0].main} {today.weather[0].description}
          </p>
          <p className="text-sm">
            H:<Degree temp={today.main.temp_max}></Degree>
            L:<Degree temp={today.main.temp_min}></Degree>
          </p>
        </section>
        <section className="flex overflow-x-scroll mt-4 pb-2 mb-5 ">
          {data.list.map((item, i) => {
            // console.log(
            //   `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
            // );

            return (
              <div
                key={i}
                className="inline-block text-center w-[50px] flex-shrink-0"
              >
                <p>{i === 0 ? "Now" : new Date(item.dt * 1000).getHours()}</p>
                <img
                  src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt=""
                />
                <p>
                  <Degree temp={item.main.temp}></Degree>
                </p>
              </div>
            );
          })}
        </section>
        {/*--------------- top two squares ------------------*/}
        <section className="flex justify-between text-zinc-700">
          <div className="w-[140px] text-xs font-bold flex flex-col items-center bg-white/20 backdrop-blur-ls rounded drop-shadow-lg py-4 mb-5">
            <Sunrise />
            <span className="mt-2"> {getSunTime(data.sunrise)}</span>
          </div>
          <div className="w-[140px] text-xs font-bold flex flex-col items-center bg-white/20 backdrop-blur-ls rounded drop-shadow-lg py-4 mb-5">
            <Sunset />
            <span className="mt-2">{getSunTime(data.sunset)}</span>
          </div>
        </section>
        {/*--------------- bottom squares: wind, feels like, visibility, humidity, pop, pressure ------------------*/}
        <section className="flex flex-wrap justify-between ">
          <Tile
            icon="wind"
            title="Wind"
            info={`${Math.round(today.wind.speed)} km/h`}
            description={`${getWindDirection(
              Math.round(today.wind.deg)
            )}, gust ${today.wind.gust.toFixed(1)} km/h`}
          ></Tile>
          <Tile
            icon="feels"
            title="Feels Like"
            info={<Degree temp={Math.round(today.main.feels_like)}></Degree>}
            description={`Feels ${
              Math.round(today.main.feels_like) < Math.round(today.main.temp)
                ? "colder"
                : "warmer"
            }`}
          ></Tile>

          <Tile
            icon="feels"
            title="Feels Like"
            info={<Degree temp={Math.round(today.main.feels_like)}></Degree>}
            description={`Feels ${
              Math.round(today.main.feels_like) < Math.round(today.main.temp)
                ? "colder"
                : "warmer"
            }`}
          ></Tile>
          <Tile
            icon="humidity"
            title="Humidity"
            info={`${today.main.humidity}`}
            description={getHumidityValue(today.main.humidity)}
          ></Tile>
          <Tile
            icon="pop"
            title="Precipitation"
            info={`${Math.round(today.pop * 1000)}%`}
            description={`${getPop(today.pop)}, clouds at ${today.clouds.all}%`}
          ></Tile>
          <Tile
            icon="visibility"
            title="Visibility"
            info={`${(today.visibility / 1000).toFixed()} km`}
            description={getVisibilityValue(today.visibility)}
          ></Tile>
        </section>
      </div>
    </div>
  );
};

export default Display;
