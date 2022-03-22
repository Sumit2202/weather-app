import thunderstorm from "./assests/Thunderstorm.svg";
import drizzle from "./assests/Drizzle.svg";
import rain from "./assests/Rain.svg";
import hail from "./assests/Hail.svg";
import snow from "./assests/Snow.svg";
import clear from "./assests/Clear.svg";
import clouds from "./assests/Clouds.svg";

export const utcSecondsToDay = (utcSeconds: number): string => {
  const date = new Date(0);
  date.setUTCSeconds(utcSeconds);
  return date.toString().substring(0, 3);
};

export const images = {
  Thunderstorm: thunderstorm,
  Rain: rain,
  Drizzle: drizzle,
  Hail: hail,
  Snow: snow,
  Clear: clear,
  Clouds: clouds,
};
