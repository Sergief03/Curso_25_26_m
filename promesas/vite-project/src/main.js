import { getWeatherPromise } from "./helpers/openweather";
import { dataJSONAsync } from "./helpers/utils";

dataJSONAsync();

getWeatherPromise("Granada")