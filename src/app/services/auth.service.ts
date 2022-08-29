import {Injectable, NgZone} from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword
} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = environment.endpoint + '/user'

  constructor(
    private auth: Auth,
    private router: Router,
    private ngZone: NgZone,
    private http: HttpClient
  ) {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        if (!this._user) this._user = this.user;
      }
    });
  }

  private _user: User | null;

  get user() {
    return !this._user ? JSON.parse(localStorage.getItem('user')!) : this._user;
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }

  init() {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        if (!this._user) this._user = this.user;
        // else { localStorage.removeItem('user'); this._user = null; }
      }
    });
  }

  SignIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((result) => {
        this.SetUserData(result.user).then(() => {
          this.ngZone.run(() => {
            this.router.navigate(['/']).then(() => {
              window.location.reload();
            });
          });
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  SignUp(email: string, password: string, name?: string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((result) => {
        this.SendVerificationMail();
        this.SetUserData(result.user, name);
        this.ngZone.run(() => {
          this.router.navigate(['/']).then(() => {
          });
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  SendVerificationMail() {
    if (!this.auth.currentUser) return alert('No user is signed in');
    return sendEmailVerification(this.auth.currentUser).then(() => {
      window.alert('Verification email sent!');
    });
  }

  ForgotPassword(passwordResetEmail: string) {
    return sendPasswordResetEmail(this.auth, passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  async SetUserData(user: any, name?: string) {
    let dbUser = this.getUser(user.uid);
    dbUser.subscribe({
      next: (resp) => {
        localStorage.setItem('user', JSON.stringify(resp));
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 404 || err.status === 400) {
          let userName = name || user.displayName || 'Cluster User'
          const avatar_url = 'https://avatars.dicebear.com/api/croodles-neutral/' + (userName).replace(/ /g, "_") + '.svg'

          let newUser: User = {
            uid: user.uid,
            email: user.email,
            name: userName,
            image: user.photoURL || avatar_url,
            is_admin: false,
            has_verified_email: user.emailVerified,
          }
          this.createUser(newUser).subscribe({
            next: () => {
              localStorage.setItem('user', JSON.stringify(newUser));
            },
            error: () => {
              localStorage.removeItem('user');
            }
          });
        }
      },
    });
  }

  getUser(uid: string): Observable<User> {
    return this.http.get<User>(this.url, {params: {uid: uid}});
  }

  createUser(user: User): Observable<any> {
    return this.http.post(this.url, user);
  }

  SignOut() {
    return this.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.ngZone.run(() => {
        this.router.navigate(['/login']).then(() => {
          window.location.reload();
        });
      });
    });
  }
}

// https://firestore.googleapis.com/google.firestore.v1.Firestore/
// Write/channel
// ?database=projects%2Fcluster-version-0%2Fdatabases%2F(default)
// &gsessionid=34NqWz5R9LC6ZWUbUQOXULlEYHq_qtF-
// &VER=8
// &RID=rpc
// &SID=6eJQOtyC0pcuXdc95GhI7A
// &CI=0&AID=0
// &TYPE=xmlhttp
// &zx=vs3o4955zvgh
// &t=1
