import {Injectable, NgZone} from '@angular/core';
import {Auth, signInWithEmailAndPassword} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User[]>;

  constructor(
    private auth: Auth,
    private afs: AngularFirestore,
    private firestore: Firestore,
    private router: Router,
    private ngZone: NgZone,
  ) { 
    
    const userCollection = collection(this.firestore, 'users');
    this.user$ = collectionData(userCollection);

    
    // console.log('AuthService constructor');
    // this.auth.onAuthStateChanged((user) => {
    //   if (user) {
    //     let userDetails = this.SetUserData(user);
    //     console.log('userDetails', userDetails);
    //     // this._user = userDetails;
    //     // localStorage.setItem('user', JSON.stringify(this._user));
    //   }
    // })
  }

  private _user: any = null;

  get user() {
    return !this._user ? JSON.parse(localStorage.getItem('user')!) : this._user;
    // return {} as User;
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }

  SignIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password).then((result) => {
      this.SetUserData(result.user);
      this.ngZone.run(() => {
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
      });
    })
    .catch((error) => {
      window.alert(error.message);
    });
  }

  SignUp(email: string, password: string, name?: string) {
  }

  SendVerificationMail() {
  }

  ForgotPassword(passwordResetEmail: string) {
  }

  GoogleAuth() {
  }

  AuthLogin(provider: any) {
  }

  SetUserData(aaa: any, name?: string) {


  //   const userRef: AngularFirestoreDocument<any> = this.afs.doc(
  //     `users/${user.uid}`
  //   );

    // userRef.subscribe(data => {
    //   if (!data) {
    //     const user_name = name ? name : 'Cluster User';
    //     const avatar_url = 'https://avatars.dicebear.com/api/croodles-neutral/' + (user_name)
    //       .replace(/ /g, "_") + '.svg'

    //     const userData: User = {
    //       uid: user.uid,
    //       email: user.email,
    //       displayName: user_name,
    //       photoURL: avatar_url,
    //       emailVerified: user.emailVerified,
    //     };
    //     return userRef.set(userData, {merge: true});
    //   } else {        
    //     return data;
    //   }
    // })
  }

  SignOut() {
    return this.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
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
