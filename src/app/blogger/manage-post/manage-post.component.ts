import { Component, OnInit } from '@angular/core';
import {BlogService} from "../../services/blog.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-manage-post',
  templateUrl: './manage-post.component.html',
  styleUrls: ['./manage-post.component.css']
})
export class ManagePostComponent implements OnInit {
  public blogs: any;
  public user: any;

  constructor(
    private blogService: BlogService,
    private afAuth: AuthService
  ) {
    this.user = this.afAuth.user;
  }

  async ngOnInit() {
    if (!this.user.uid) {
      return window.alert('You are not logged in');
    }
    await this.blogService.get_blogs(this.user.admin ? null : this.user.uid).then((e: any[]) => {
      this.blogs = e;
    });
  }

  onDelete(blog: any) {
    if (this.afAuth.user.uid != blog.UID && !this.afAuth.user.admin) {
      window.alert('You are not authorized to update this post');
      return window.location.replace('/');
    }

    if (blog) {
      if (window.confirm('Are you sure you want to delete this post?')) {
        this.blogService.delete_blog(blog).then(() => {
          window.alert('Blog deleted!');
          window.location.reload();
        }).catch(e => {
          window.alert(e);
        });
      }
    }
  }

}
