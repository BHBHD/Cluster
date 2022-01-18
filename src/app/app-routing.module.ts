import { FooterComponent } from './footer/footer.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { ReadblogComponent } from './readblog/readblog.component';
import { ManagePostComponent } from './manage-post/manage-post.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { HeaderComponent } from './header/header.component';
import { AccountsComponent } from './accounts/accounts.component';
const routes: Routes = [
    {path:"header",component:HeaderComponent},
    {path:"footer",component:FooterComponent},
    {path: "", component:HomeComponent},
    {path: "login",component:LoginComponent},
    {path:"admin",component:AdminComponent},
    {path: "manageuser",component:ManageUserComponent},
    {path:"accounts",component:AccountsComponent},
    {path: "managepost",component:ManagePostComponent},
    {path: "readblog",component:ReadblogComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
