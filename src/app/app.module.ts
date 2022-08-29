import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {CreatePostComponent} from './blogger/create-post/create-post.component';
import {LoginComponent} from './authentication/login/login.component';
import {ReadblogComponent} from './blogger/readblog/readblog.component';
import {ManagePostComponent} from './blogger/manage-post/manage-post.component';
import {ManageUserComponent} from './accounts/manage-user/manage-user.component';
import {FooterComponent} from './core/footer/footer.component';
import {AccountsComponent} from './accounts/accounts.component';
import {FirebaseModule} from "./firebase.module";
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {NavbarComponent} from './core/navbar/navbar.component';
import {AuthService} from "./services/auth.service";
import {RegisterUserComponent} from './authentication/register-user/register-user.component';
import {ForgotPasswordComponent} from './authentication/forgot-password/forgot-password.component';
import {VerifyEmailComponent} from './authentication/verify-email/verify-email.component';
import {HttpClientModule} from "@angular/common/http";
import {TruncatePipe} from "./pipes/truncate.pipe";
import {TimeSincePipe} from "./pipes/time-since.pipe";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {environment} from '../environments/environment';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {FileSelectDirective, FileUploadModule} from 'ng2-file-upload';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ImgNamePipe} from "./pipes/img-name.pipe";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreatePostComponent,
    LoginComponent,
    ReadblogComponent,
    ManagePostComponent,
    ManageUserComponent,
    FooterComponent,
    AccountsComponent,
    NotFoundComponent,
    NavbarComponent,
    RegisterUserComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,

    TruncatePipe,
    TimeSincePipe,
    ImgNamePipe
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    FirebaseModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FileUploadModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
