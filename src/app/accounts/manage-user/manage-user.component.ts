import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {

  public users: any[] = [];

  constructor(
    public authService: AuthService,
    public afs: AngularFirestore,
  ) { }

  ngOnInit() {
    this.afs.collection('users').stateChanges().subscribe(r => {
      this.users = r.map(a => {
        let some = a.payload.doc.data();
        return {
          id: a.payload.doc.id,
          ...some as User
        }
      });
    });
  }

  onApprove(user: User) {
    this.afs.collection('users').doc(user.uid).update({
      emailVerified: true
    }).then(() => {
      window.alert('User approved!');
      window.location.reload();
    });
  }

  onFuture(user: User) {
    this.afs.collection('users').doc(user.uid).update({
      emailVerified: false
    }).then(() => {
      window.alert('User dis-approved');
      window.location.reload();
    });
  }

  onDelete(user: User) {
    if (window.confirm('Are you sure you want to delete this user?')) {
      this.afs.collection('users').doc(user.uid).delete().then(() => {
        window.alert('User deleted!');
        window.location.reload();
      });
    }
  }
}
