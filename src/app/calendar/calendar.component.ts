import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {

currentMonth!: number;
currentYear!: number;
days: number[] = [];
dayNames: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
monthNames: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

ngOnInit() {
const today = new Date();
this.currentMonth = today.getMonth();
this.currentYear = today.getFullYear();
this.generateDays(); }

generateDays() {
const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
this.days = Array(firstDay).fill(null).concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));
}

prevMonth() {
if (this.currentMonth === 0) {
this.currentMonth = 11; this.currentYear--; }
else {
this.currentMonth--;
}
this.generateDays();
}

nextMonth() {
if (this.currentMonth === 11)
{ this.currentMonth = 0;
this.currentYear++;
}else{
this.currentMonth++;
}
this.generateDays();
}

}
