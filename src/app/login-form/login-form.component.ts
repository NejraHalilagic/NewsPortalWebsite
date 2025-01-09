import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule  } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
 userName: string = '';
 password: string = '';

 userNameForValidation = '';
 currentPassword: string = '';
 newPassword: string = '';
 confirmPassword: string = '';

 isSuccessModalVisible: boolean = false;
 isModalVisible = false;


 constructor(private http: HttpClient, private router: Router) {}

 /*nakon sto povezem sa bazom moram napravit da se provjerava i username i password JESAM
  ovdje se moze prijavit admin i pustit ce ga na njegov dash
  ukoliko je user vratit ce ga na pocetnu stranu novostima JESAM
  takode kod provjere ukoliko je pogresno ono sto je upisano moram se obrisat sve iz unosa
  u izbaciti alert da je pogresno JESAM
  ovo dole je base code*/

onSubmit(): void {
   const password = this.password.trim();
   const userName = this.userName.trim();
   const message = document.getElementById('message') as HTMLElement;


      if (!userName || !password) {
        message.textContent = 'Both fields are required.';
        message.style.display = 'block';
        message.style.color = 'red';
        return;
      }

    /*if (userName === 'admin' && password === 'admin') {
        this.router.navigate(['/admin-dashboard']);
        return;
      }*/

      const loginData = { userName: this.userName, password: this.password };

      if (this.userName === 'admin') {
          // Check admin credentials
          this.http.post('http://localhost/database/checkForAdmin.php', loginData).subscribe(
            (response: any) => {
              if (response.status === 'success') {
                // Admin verified
                this.router.navigate(['/admin-dashboard']);
              } else {
                alert('Admin login failed: ' + response.message);
              }
            },
            (error) => {
              console.error('Error:', error);
            }
          );
        } else {
            this.http.post('http://localhost/database/loginUser.php', loginData).subscribe(
              (response: any) => {
                if (response.status === 'success') {
                   this.isSuccessModalVisible = true;
                } else {
                   message.textContent = 'User name or password incorrect!';
                   message.style.display = 'block';
                   this.clearForm();
                }
              },
                (error) => {
                console.error('Error:', error);
                message.textContent = 'An error occurred. Please try again.';
                message.style.display = 'block';
                message.style.color = 'red';
              }
            );
          }
        }

   openModal(): void {
       this.isModalVisible = true;
     }

     // Close the modal
     closeModal(): void {
       this.isModalVisible = false;
     }

     // Submit the password change form
     submitPassword(): void {

        const modalMessage = document.getElementById('modalMessage') as HTMLElement;

       if (!this.userNameForValidation || !this.currentPassword || !this.newPassword || !this.confirmPassword) {
         modalMessage.textContent = 'All fields are required.';
         modalMessage.style.display = 'block';
         return;
       }

       if (this.newPassword !== this.confirmPassword) {
         modalMessage.textContent = 'New password and confirm password do not match.';
         modalMessage.style.display = 'block';
         return;
       }

       const passwordData = {
         userName: this.userNameForValidation,
         currentPassword: this.currentPassword,
         newPassword: this.newPassword
       };

       this.http.post('http://localhost/database/updatePassword.php', passwordData).subscribe(
         (response: any) => {
           if (response.status === 'success') {
             modalMessage.textContent = 'Password changed successfully.';
             modalMessage.style.display = 'block';
             this.closeModal();
           } else {
             modalMessage.textContent = 'Error changing password!';
             modalMessage.style.display = 'block';
             console.error('Error:', response.message);
           }
         },
         (error) => {
           console.error('Error updating password:', error);
         }
       );
     }



    clearForm(): void {
      this.userName = '';
      this.password = '';
    }

    onModalOk(): void {
          this.isSuccessModalVisible = false;
          this.router.navigate(['/home']);
        }


}
