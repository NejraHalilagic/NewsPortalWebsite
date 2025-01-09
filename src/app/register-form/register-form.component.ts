import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {
  firstName: string = '';
  lastName: string = '';
  userName: string = '';
  email: string = '';
  password: string = '';
  hashedPassword: string = '';
  confirmPassword: string = '';
  isSuccessModalVisible: boolean = false; // Variable to control modal visibility

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(): void {
    const email = this.email.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password = this.password.trim();
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*?])[A-Za-z\d!@#$%^&*?]{8,}$/;
    const saltRounds = 10;

    const firstNameMessage = document.getElementById('firstNameMessage') as HTMLElement;
    const lastNameMessage = document.getElementById('lastNameMessage') as HTMLElement;
    const userNameMessage = document.getElementById('userNameMessage') as HTMLElement;
    const emailMessage = document.getElementById('emailMessage') as HTMLElement;
    const passwordMessage = document.getElementById('passwordMessage') as HTMLElement;
    const confirmPasswordMessage = document.getElementById('confirmPasswordMessage') as HTMLElement;

    let hasError = false;

    if (!this.firstName) {
      firstNameMessage.textContent = 'First name field cannot be empty!';
      firstNameMessage.style.display = 'block';
      hasError = true;
    } else {
      firstNameMessage.style.display = 'none';
    }

    if (!this.lastName) {
      lastNameMessage.textContent = 'Last name field cannot be empty!';
      lastNameMessage.style.display = 'block';
      hasError = true;
    } else {
      lastNameMessage.style.display = 'none';
    }

    if (!this.userName) {
      userNameMessage.textContent = 'User name field cannot be empty!';
      userNameMessage.style.display = 'block';
      hasError = true;
    } else {
      userNameMessage.style.display = 'none';
    }

    if (!emailPattern.test(email)) {
      emailMessage.textContent = 'Invalid email';
      emailMessage.style.display = 'block';
      hasError = true;
    } else if (!email) {
      emailMessage.textContent = 'Email field cannot be empty';
      emailMessage.style.display = 'block';
      hasError = true;
    } else {
      emailMessage.style.display = 'none';
    }

    if (!passwordPattern.test(password)) {
      passwordMessage.textContent =
        'Password must be at least 8 characters long, include uppercase and lowercase letters, and contain at least one special character (!, ?, @, etc.).';
      passwordMessage.style.display = 'block';
      hasError = true;
    } else {
      this.hashedPassword = bcrypt.hashSync(password, saltRounds);
      passwordMessage.style.display = 'none';
    }

    if (!this.confirmPassword) {
      confirmPasswordMessage.textContent = 'Confirm password field cannot be empty!';
      confirmPasswordMessage.style.display = 'block';
      hasError = true;
    } else if (password !== this.confirmPassword) {
      confirmPasswordMessage.textContent = 'Passwords do not match';
      confirmPasswordMessage.style.display = 'block';
      hasError = true;
    } else {
      confirmPasswordMessage.style.display = 'none';
    }

    if (hasError) return;

    //check if user name exists if not alert user
    this.http.post('http://localhost/database/checkForUserName.php', { userName: this.userName }).subscribe(
            (response: any) => {
              if (response.status === 'exists') {
                userNameMessage.textContent = 'Username is already taken!';
                userNameMessage.style.display = 'block';
                hasError = true;
              } else if (response.status === 'available') {
                userNameMessage.style.display = 'none';
                hasError = false;

                //if does, continue adding user to database
                const userData = {
                      firstName: this.firstName,
                      lastName: this.lastName,
                      userName: this.userName,
                      email: this.email,
                      password: this.hashedPassword,
                    };

                    this.http.post('http://localhost/database/registerUser.php', userData).subscribe(
                      (response: any) => {
                        if (response.status === 'success') {
                          //alert(response.message);
                          this.clearForm();
                          this.isSuccessModalVisible = true; // Show success modal
                        } else {
                          alert(response.message);
                        }
                      },
                      (error) => {
                        console.error('Error:', error);
                        alert('An error occurred while registering. Please try again.');
                      }
                 );
              }
            },
            (error) => {
              console.error('Error:', error);
              userNameMessage.textContent = 'An error occurred while checking username.';
              userNameMessage.style.display = 'block';
              userNameMessage.style.color = 'red';
              hasError = true;
            }
          );






  }

  clearForm(): void {
    this.firstName = '';
    this.lastName = '';
    this.userName = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
  }

   onModalOk(): void {
         this.isSuccessModalVisible = false; // Hide modal
         this.router.navigate(['/home']); // Navigate to home page
       }


}
