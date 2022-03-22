import { Component } from "react";
import { WeatherInfo } from "../types";
import { images } from "../utils";

class MiniWeather extends Component<{ cityWeather: WeatherInfo }> {
  render() {
    const { cityWeather } = this.props;
    return (
      <div className="border-b-6 border-white flex flex-col justify-center items-center py-12 rounded-t-lg">
        <p className="font-thin text-2xl">Today</p>
        <div className="flex flex-row items-center gap-x-4">
          <img
            className="w-24"
            src={images[cityWeather.type]}
            alt={cityWeather.type}
          />
          <div className="py-4">
            <p className="text-6xl">{cityWeather.temperature}&deg;</p>
            <p className="font-thin text-2xl">{cityWeather.type}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default MiniWeather;
