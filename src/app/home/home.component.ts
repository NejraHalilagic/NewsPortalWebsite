import { Component } from '@angular/core';
import {CalendarComponent} from '../calendar/calendar.component';
import {NewsCardComponent} from '../news-card/news-card.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NewsCardComponent ,CalendarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

}
