import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule  } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

  displayUsers: boolean = false;
  displayNews: boolean = false;
  isSuccessModalVisible: boolean = false;
  isEditModalVisible: boolean = false;
  isEditModalVisible2: boolean = false;

  users: any[] = [];
  news: any[] = [];
  selectedUser: any = null;
  selectedNews: any = null;

  constructor(private http: HttpClient) {}


  // Load users from the database
  loadUsers(): void {
    this.displayUsers = true;
    this.displayNews = false;

    this.http.get('http://localhost/database/getUsers.php').subscribe(
      (response: any) => {
        this.users = response.users;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  // Load news from the database
  loadNews(): void {
    this.displayUsers = false;
    this.displayNews = true;

    this.http.get('http://localhost/database/getNews.php').subscribe(
      (response: any) => {
        this.news = response.news;
      },
      (error) => {
        console.error('Error fetching news:', error);
      }
    );
  }

editUser(userId: number): void {
    //alert(`Edit user with ID: ${userId}`);
    this.selectedUser = this.users.find(user=> user.ID === userId);
    this.isEditModalVisible = true;

  }

  closeEditModal(): void {
      this.isEditModalVisible = false;
      this.selectedUser = null; // Reset selected user

    }

  updateUser(): void {
      if (this.selectedUser) {
        this.http.post('http://localhost/database/updateUser.php', this.selectedUser).subscribe(
          (response: any) => {
            if (response.status === 'success') {
              //alert('User updated successfully.');
              this.loadUsers(); // Refresh the user list
              this.closeEditModal(); // Close modal

            } else {
              alert(response.message || 'Failed to update user.');
            }
          },
          (error) => {
            console.error('Error updating user:', error);
          }
        );
      }
    }




 deleteUser(userId: number): void {
 alert('Are you sure you want to delete user?');
   if (userId) {
     this.http.post('http://localhost/database/deleteUser.php', { ID: userId }).subscribe(
       (response: any) => {
         if (response.status === 'success') {
           this.isSuccessModalVisible=true;
           this.loadUsers(); // Refresh the table
         } else {
           alert(response.message || 'Failed to delete user.');
         }
       },
       (error) => {
         console.error('Error deleting user:', error);
       }
     );
   }
 }


    editNews(newsId: number): void {
        this.selectedNews = this.news.find((news) => news.newsID === newsId);
        this.isEditModalVisible2 = true;
    }

    closeEditModal2(): void {
        this.isEditModalVisible2 = false;
        this.selectedNews = null; // Reset selected news
    }

    updateNews(): void {
        if (this.selectedNews) {
            this.http.post('http://localhost/database/updateNews.php', this.selectedNews).subscribe(
                (response: any) => {
                    if (response.status === 'success') {
                        alert('News updated successfully.');
                        this.loadNews(); // Refresh the news list
                        this.closeEditModal2(); // Close modal
                    } else {
                        alert(response.message || 'Failed to update news.');
                    }
                },
                (error) => {
                    console.error('Error updating news:', error);
                }
            );
        }
    }

    // Delete news action
    deleteNews(newsId: number): void {
    alert('Are you sure you want to delete news?');
      if (newsId) {
        this.http.post('http://localhost/database/deleteNews.php?', {id: newsId}).subscribe(
          (response: any) => {
            this.isSuccessModalVisible= true;
            this.loadNews(); // Refresh the table
          },
          (error) => {
            console.error('Error deleting news:', error);
          }
        );
      }
    }



  onModalOk(): void {
          this.isSuccessModalVisible = false;
          return;
         }



}
