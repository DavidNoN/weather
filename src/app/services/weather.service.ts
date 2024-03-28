import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import weatherStates from '../../assets/data/weather-states.json';
import {WeatherHomeStatesInterface} from "../interfaces/weather-home-states.interface";
import {Period, Properties, Weather} from "../interfaces/weather.interface";
import {WeatherHumidityInterface, WeatherTemperatureInterface} from "../interfaces/weather-responses.interface";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) {}
  getTemperature(stateOrDistrict: string) : Observable<WeatherTemperatureInterface[]> {
    const url = `https://api.weather.gov/gridpoints/${stateOrDistrict}/31,80/forecast`;
    return this.http.get<Weather>(url).pipe(
      map(value => value.properties.periods.flatMap( period => ({
        pos: period.number,
        temperature: period.temperature,
        name: period.name,
      })))
    );
  }

  getHumidity(stateOrDistrict: string) : Observable<WeatherHumidityInterface[]> {
    const url = `https://api.weather.gov/gridpoints/${stateOrDistrict}/31,80/forecast`;
    return this.http.get<Weather>(url).pipe(
      map(value => value.properties.periods.flatMap( period => ({
        pos: period.number,
        humidity: period.relativeHumidity.value || 0,
        name: period.name,
      })))
    );
  }

  getHomeWeathers(): WeatherHomeStatesInterface[] {
    return weatherStates.map(weather => ({
      name: weather.name,
      flagUrl: weather.flag_url,
      cod: weather.cod
    })) as WeatherHomeStatesInterface[];
  }

}
