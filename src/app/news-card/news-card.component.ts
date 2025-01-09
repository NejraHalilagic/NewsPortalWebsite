import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-news-card',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './news-card.component.html',
  styleUrl: './news-card.component.css'
})
export class NewsCardComponent implements OnInit {
   data: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.http.get('http://localhost/database/newsGetData.php').subscribe(
      (response: any) => {
        if (response.status === 'success') {
          this.data = response.data;
        } else {
          console.error(response.message);
        }
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    );
  }


}
