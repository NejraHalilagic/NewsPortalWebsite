import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-news-content',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './news-content.component.html',
  styleUrls: ['./news-content.component.css'],
})
export class NewsContentComponent implements OnInit {
  data: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
      const newsID = this.route.snapshot.paramMap.get('newsID')!;
      this.fetchData(newsID);

    }

    fetchData(newsID: string | null): void {
      if (newsID) {
        this.http.get(`http://localhost/database/newsGetDataWithContent.php?id=${newsID}`).subscribe(
          (response: any) => {
            if (response.status === 'success' && response.data && response.data.length > 0) {
              this.data = response.data[0];  // Access the first item of the array
            } else {
              console.error('No data found for the given ID');
            }
          },
          (error: any) => {
            console.error('Error fetching data:', error);
          }
        );
      } else {
        console.error('Invalid or missing ID.');
      }
    }
}
