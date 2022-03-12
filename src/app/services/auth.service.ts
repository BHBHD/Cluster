import {Injectable, NgZone} from '@angular/core';
import * as auth from 'firebase/auth';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import {Router} from '@angular/router';
import {User} from "./User";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private _user: any = null;

  get user() {
    return !this._user ? JSON.parse(localStorage.getItem('user')!) : this._user;
  }

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        const local = this.afs.collection('users').doc(user.uid);
        if (local) {
          local.get().subscribe((data) => {
            this._user = data.data();

            localStorage.setItem('user', JSON.stringify(this._user));
            JSON.parse(localStorage.getItem('user')!);
          });
        }
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }

  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['/']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  SignUp(email: string, password: string, name?: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SendVerificationMail();
        this.SetUserData(result.user, name);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }

  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      if (res) {
        this.router.navigate(['/']);
      }
    });
  }

  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['/']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  SetUserData(user: any, name?: string) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );

    userRef.valueChanges().subscribe(data => {
      if (!data) {
        const user_name = name? name : 'Cluster User';
        const avatar_url = 'https://avatars.dicebear.com/api/croodles-neutral/' + (user_name)
          .replace(/ /g,"_") + '.svg'

        const userData: User = {
          uid: user.uid,
          email: user.email,
          displayName: user_name,
          photoURL: avatar_url,
          emailVerified: user.emailVerified,
        };
        return userRef.set(userData, {merge: true});
      }
      else {
        return data;
      }
    })
    // const userRef = this.afs.collection('users').doc(user.uid)
    //
    // local.valueChanges().subscribe(data => {
    //   this.userData = data;
    // })
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/']).then(() => {
        window.location.reload();
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
