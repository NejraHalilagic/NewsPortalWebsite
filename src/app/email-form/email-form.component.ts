import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule  } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-email-form',
  standalone: true,
  imports: [ CommonModule, HttpClientModule, FormsModule],
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent {
  email: string = ''; // Variable to store email input
  responseMessage: string | null = null; // To display server response

  constructor(private http: HttpClient) {}

  submitEmail(): void {
    // Prepare the email data to be sent to the backend
    const emailData = { email: this.email };

    // Send the email data to the PHP server
    this.http.post('http://localhost/database/insertEmail.php', emailData)
      .subscribe(
        (response: any) => {
          // Display success or error message from the PHP response
          this.responseMessage = response.status === 'success' ? 'Email submitted successfully!' : 'Failed to submit email.';
          this.email = '';
        },
        (error) => {
          // Handle any errors from the server
          console.error('Error submitting email:', error);
          this.responseMessage = 'There was an error submitting the email.';
        }
      );
  }
}
