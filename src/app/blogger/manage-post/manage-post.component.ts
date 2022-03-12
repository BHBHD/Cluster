import { Component, OnInit } from '@angular/core';
import {BlogService} from "../../services/blog.service";
import {AuthService} from "../../services/auth.service";
import { truncate, timeSince } from "../../utils";

@Component({
  selector: 'app-manage-post',
  templateUrl: './manage-post.component.html',
  styleUrls: ['./manage-post.component.css']
})
export class ManagePostComponent implements OnInit {
  public blogs: any;
  public uid: any;

  constructor(
    private blogService: BlogService,
    private afAuth: AuthService
  ) {
    this.uid = this.afAuth.user.uid;
  }

  async ngOnInit() {
    if (!this.uid) {
      return window.alert('You are not logged in');
    }
    await this.blogService.get_blogs(this.uid).then(e => {
      this.blogs = e.blogs;
    });
  }

  onDelete(blog: any) {
    if (this.afAuth.user.uid != blog.UID) {
      window.alert('You are not authorized to update this post');
      return window.location.replace('/');
    }

    if (blog) {
      this.blogService.delete_blog(blog).then(() => {
        window.alert('Blog deleted');
        window.location.reload();
      }).catch(e => {
        window.alert(e);
      });
    }
  }

}
