import {NgModule} from '@angular/core'
import {RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component'
import {EmailFormComponent} from './email-form/email-form.component'
import {LoginFormComponent} from './login-form/login-form.component'
import {RegisterFormComponent} from './register-form/register-form.component'
import {AboutUsComponent} from './about-us/about-us.component'
import {ContactUsComponent} from './contact-us/contact-us.component'
import {PurchaseBackIssuesComponent} from './purchase-back-issues/purchase-back-issues.component'
import {NewsContentComponent} from './news-content/news-content.component'
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component'

export const routes: Routes = [
{path: '', component: HomeComponent},
{path: 'email-form', component: EmailFormComponent},
{path: 'login-form', component: LoginFormComponent},
{path: 'register-form', component: RegisterFormComponent},
{path: 'about-us', component: AboutUsComponent},
{path: 'contact-us', component: ContactUsComponent},
{path: 'purchase-back-issues', component: PurchaseBackIssuesComponent},
{path: 'news-content/:newsID', component: NewsContentComponent},
{path: 'admin-dashboard', component: AdminDashboardComponent},
{path: '**', redirectTo: ''}
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule{}
