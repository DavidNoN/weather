import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {WeatherService} from "../../services/weather.service";
import {forkJoin, Subscription} from "rxjs";
import {WeatherHumidityInterface, WeatherTemperatureInterface} from "../../interfaces/weather-responses.interface";
import Chart, {ChartType} from 'chart.js/auto';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent implements OnInit, OnDestroy{

  private placeName: string | null = null;

  private weatherPeriodsResponse: Subscription | undefined;

  protected chart: Chart<ChartType, string[], string> | undefined;

  protected temperatures: WeatherTemperatureInterface[] = [];
  protected humidity: WeatherHumidityInterface[] = [];

  constructor(private route: ActivatedRoute, private weatherService: WeatherService) {}

  ngOnDestroy(): void {
    this.weatherPeriodsResponse &&
        this.weatherPeriodsResponse.unsubscribe();
    }

  ngOnInit(): void {
    this.placeName = this.route.snapshot.paramMap.get('name');
    if (this.placeName) {
      const $temperature = this.weatherService.getTemperature(this.placeName);
      const $humidity = this.weatherService.getHumidity(this.placeName);

      if (!this.weatherPeriodsResponse) {

        this.weatherPeriodsResponse = forkJoin([
          $temperature,
          $humidity
        ]).subscribe({
          next: ([temperatures, humidity]) => {
            this.temperatures = temperatures
            this.humidity = humidity
          },
          error: (err) => console.error(err),
          complete: () => this.drawChart()
        });
      }

    }


    }

    drawChart = () => {

      this.chart = new Chart("MyChart", {
        type: 'line', //this denotes tha type of chart

        data: {// values on X-Axis
          labels: this.temperatures.map(name => name.name),
          datasets: [
            {
              label: "Temperature °F",
              data: this.temperatures.map(temp => String(temp.temperature)),
              backgroundColor: 'blue'
            },
            {
              label: "Humidity (%)",
              data: this.humidity.map(hum => String(hum.humidity)),
              backgroundColor: 'limegreen'
            }
          ]
        },
        options: {
          aspectRatio:2.5
        }

      });
    }

}
