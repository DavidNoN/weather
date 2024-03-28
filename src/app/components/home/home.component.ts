import {Component, OnInit} from '@angular/core';
import {WeatherService} from "../../services/weather.service";
import {DatePipe, NgOptimizedImage} from "@angular/common";
import {WeatherHomeStatesInterface} from "../../interfaces/weather-home-states.interface";
import {RouterLink} from "@angular/router";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgOptimizedImage,
    DatePipe,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  protected weatherStates: WeatherHomeStatesInterface[] = [];
  protected readonly today: Date = new Date();

  constructor(private weatherService: WeatherService) {

  }

  ngOnInit(): void {
    this.weatherStates = this.weatherService.getHomeWeathers();
    }

}
