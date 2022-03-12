import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from './authentication/login/login.component';
import {CreatePostComponent} from './blogger/create-post/create-post.component';
import {ReadblogComponent} from './blogger/readblog/readblog.component';
import {ManagePostComponent} from './blogger/manage-post/manage-post.component';
import {ManageUserComponent} from './accounts/manage-user/manage-user.component';
import {AccountsComponent} from './accounts/accounts.component';
import {NotFoundComponent} from "./pages/not-found/not-found.component";
import {RegisterUserComponent} from "./authentication/register-user/register-user.component";
import {ForgotPasswordComponent} from "./authentication/forgot-password/forgot-password.component";
import {AuthGuard} from "./guards/auth.guard";
import {VerifyEmailComponent} from "./authentication/verify-email/verify-email.component";
import {UserGuard} from "./guards/user.guard";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'readblog/:uid/:id', component: ReadblogComponent},

  {path: 'create-post/:uid', component: CreatePostComponent, canActivate: [AuthGuard]},
  {path: 'create-post/:uid/:id', component: CreatePostComponent, canActivate: [AuthGuard]},
  {path: 'managepost', component: ManagePostComponent, canActivate: [AuthGuard]},
  {path: 'manageuser', component: ManageUserComponent, canActivate: [AuthGuard]},
  {path: 'accounts', component: AccountsComponent, canActivate: [AuthGuard]},

  {path: 'login', component: LoginComponent, canActivate: [UserGuard]},
  {path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [UserGuard]},
  {path: 'register-user', component: RegisterUserComponent, canActivate: [UserGuard]},
  {path: 'verify-email-address', component: VerifyEmailComponent, canActivate: [UserGuard]},

  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {initialNavigation: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
