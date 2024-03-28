import { Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {ChartComponent} from "./components/chart/chart.component";

export const routes: Routes = [
  { path: 'home', title: 'Home Weather', component: HomeComponent },
  { path: 'weather/:name', title: 'Weather Details', component: ChartComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
