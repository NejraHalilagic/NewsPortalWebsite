import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {HeaderComponent} from './header/header.component'
import {NavBarComponent} from './nav-bar/nav-bar.component'
import {HomeComponent} from './home/home.component'
import {CalendarComponent} from './calendar/calendar.component'


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HeaderComponent, NavBarComponent, HomeComponent, CalendarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ARTNews';
  showLayout = true;

  constructor(private router: Router){
  this.router.events.subscribe(()=>{
  this.showLayout = !this.router.url.includes('email-form');
  });

  }

}
