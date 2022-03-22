import React, { Component } from "react";
import "./App.css";
import { City, Daily, RootObject, WeatherInfo, WeatherType } from "./types";
import axios from "axios";
import Loading from "./components/Loading";
import { default as ErrorComponent } from "./components/Error";
import { utcSecondsToDay } from "./utils";
import Weather from "./components/Weather";
import MiniWeather from "./components/MiniWeather";

const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/onecall";
const WEATHER_API_KEY = import.meta.env.VITE_OPEN_API_KEY;

const CITY_MAP: Map<City, { lat: string; long: string }> = new Map([
  ["Toronto", { lat: "43.7001", long: "-79.4163" }],
  ["San Francisco", { lat: "37.7749", long: "122.4194" }],
  ["Vancouver", { lat: "49.2827", long: "123.1207" }],
]);

const setURLParams = (url: URL, key: string, val: string) => {
  url.searchParams.append(key, val);
};

const mapDataToWeather = (data: Daily, index: number) => {
  return {
    temperature: Math.round(data.temp.day),
    day: index == 0 ? "Today" : utcSecondsToDay(data.dt),
    type: data.weather[0].main as WeatherType,
  };
};

type State = {
  isLoading: boolean;
  cityWeather: WeatherInfo[] | null;
  selectedCity: City;
  error: boolean;
};

class App extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: false,
      cityWeather: null,
      selectedCity: "Toronto",
      error: false,
    };
  }

  getURL = (): string => {
    const url = new URL(WEATHER_API_URL);
    setURLParams(url, "lat", CITY_MAP.get(this.state.selectedCity)?.lat || "");
    setURLParams(url, "lon", CITY_MAP.get(this.state.selectedCity)?.long || "");
    setURLParams(url, "exclude", "current,minutely,hourly,alerts");
    setURLParams(url, "units", "metric");
    setURLParams(url, "appid", WEATHER_API_KEY?.toString() || "");
    return url.toString();
  };

  fetchWeather = async () => {
    try {
      if (CITY_MAP.has(this.state.selectedCity) && WEATHER_API_KEY != null) {
        let url = this.getURL();
        this.setState({ isLoading: true });
        const res = await axios.get<RootObject>(url);
        if (res.status === 200) {
          const weathers: WeatherInfo[] = res.data.daily
            .slice(0, 5)
            .map(mapDataToWeather);
          this.setState({ cityWeather: weathers });
        } else {
          throw new Error("Error fetching weather data");
        }
      } else {
        throw new Error("Invalid City");
      }
    } catch (e) {
      this.setState({ error: true });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  componentDidMount() {
    this.fetchWeather();
  }

  componentDidUpdate(_: any, prevState: State) {
    if (prevState.selectedCity !== this.state.selectedCity) {
      this.fetchWeather();
    }
  }

  setErrorState = (state: boolean) => {
    this.setState({ error: state });
  };

  render() {
    const { isLoading, cityWeather, selectedCity, error } = this.state;
    if (error) return <ErrorComponent setError={this.setErrorState} />;
    return (
      <div className="flex h-screen justify-center items-center bg-zumthor py-3 lg:py-12">
        <main className="lg:w-5/12">
          <nav className="flex flex-row items-center">
            <ul className="flex flex-row items-center text-center gap-x-4 md:gap-x-8 pt-4 md:pt-16 px-4 mx-auto text-2xl lg:text-3xl">
              {[...CITY_MAP.keys()].map((city) => (
                <li
                  key={city}
                  onClick={() => {
                    this.setState({ selectedCity: city });
                  }}
                  className={
                    "cursor-pointer select-none " +
                    (city === selectedCity
                      ? "font-semibold text-malibu"
                      : "font-thin")
                  }
                >
                  {city}
                </li>
              ))}
            </ul>
          </nav>
          {isLoading ? (
            <Loading />
          ) : (
            <section
              className="bg-zumthor border-8 border-white rounded-lg shadow-lg my-2 lg:my-8"
              style={{ border: "6px solid #fff" }}
            >
              {cityWeather && (
                <>
                  <Weather cityWeather={cityWeather[0]} />
                  <MiniWeather cityWeathers={cityWeather.slice(1, 5)} />
                </>
              )}
            </section>
          )}
        </main>
      </div>
    );
  }
}

export default App;
