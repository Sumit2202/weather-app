import { Component } from "react";
import { WeatherInfo } from "../types";
import { images } from "../utils";

class MiniWeather extends Component<{ cityWeathers: WeatherInfo[] }> {
  render() {
    const { cityWeathers } = this.props;
    return (
      <div className="flex flex-col lg:flex-row justify-between">
        {cityWeathers.map((weather) => (
          <div
            className="grid gap-4 grid-cols-3 lg:grid-cols-1 items-center justify-items-center px-4 mx-auto py-6 w-full border-b-6 lg:border-b-0 last:border-b-0 lg:border-r-6 lg:last:border-r-0 border-white"
            key={weather.day}
          >
            <p className="font-thin text-2xl">{weather.day}</p>
            <img
              className="w-12 py-3"
              src={images[weather.type]}
              alt={weather.type}
            />
            <p className="text-4xl">{weather.temperature}&deg;</p>
          </div>
        ))}
      </div>
    );
  }
}

export default MiniWeather;