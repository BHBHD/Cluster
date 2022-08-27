import {Component, OnInit} from '@angular/core';
import {BlogService} from "../../services/blog.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-manage-post',
  templateUrl: './manage-post.component.html',
  styleUrls: ['./manage-post.component.css']
})
export class ManagePostComponent implements OnInit {
  public user: User;

  constructor(
    private blogService: BlogService,
    private afAuth: AuthService
  ) {
    this.user = this.afAuth.user;
  }

  get blogs() {
    if (this.user.is_admin) return this.blogService.blogs;
    else return this.blogService.get_blogs_by_uid(this.user.uid);
  }

  ngOnInit() {
    this.blogService.init();
  }

  onDelete(blog: any) {
    if (this.user.uid != blog.uid && !this.user.is_admin) {
      window.alert('You are not authorized to update this post');
      return window.location.replace('/');
    }

    if (blog) {
      if (window.confirm('Are you sure you want to delete this post?')) {
        this.blogService.delete_blog(blog).subscribe({
          next: () => {
            window.alert('Post has been deleted');
            window.location.reload();
          },
          error: () => {
            window.alert("There's been an error while deleting the post");
            window.location.reload();
          }
        });
      }
    }
  }

}
