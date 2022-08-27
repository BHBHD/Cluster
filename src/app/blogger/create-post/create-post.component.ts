import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BlogService} from "../../services/blog.service";
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-admin',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {

  createForm = new FormGroup({
    title: new FormControl(''),
    image: new FormControl(''),
    content: new FormControl(''),
  });

  updateForm = new FormGroup({
    title: new FormControl(''),
    image: new FormControl(''),
    content: new FormControl(''),
  });

  public blog: Blog | undefined;
  public user: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private blogService: BlogService,
    private afAuth: AuthService
  ) {
    this.blogService.init()
    this.user = this.afAuth.user;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(async (paramMap) => {
      const id = paramMap.get('id');
      const uid = paramMap.get('uid');

      if (id && uid) {
        this.blog = this.blogService.get_blog(id, uid);
        if (this.blog) {
          this.updateForm.setValue({
            title: this.blog.title,
            content: this.blog.content,
            image: this.blog.image ? this.blog.image : '',
          });
        }
      }
    });
  }

  onUpdate() {
    if (!this.blog) return window.location.replace('/');

    if (this.user.uid != this.blog.uid) {
      window.alert('You are not authorized to update this post');
      return window.location.replace('/');
    }

    const updatedBlog: UpdateBlog = {
      id: (this.blog.id).toString(),
      title: this.updateForm.value.title,
      content: this.updateForm.value.content,
      image: this.updateForm.value.image,
    };

    this.blogService.update_blog(updatedBlog).subscribe({
      next: () => {
        window.alert('Post has been updated');
        window.location.reload();
      },
      error: () => {
        window.alert("There's been an error while deleting the post");
        window.location.reload();
      }
    })
  }

  onCreate() {
    const blog: CreateBlog = {
      title: this.createForm.value.title,
      content: this.createForm.value.content,
      image: this.createForm.value.image,
      author: this.afAuth.user.displayName,
      uid: this.afAuth.user.uid,
    };
    // if (!this.user.has_verified_email) {
    //   return window.alert('You need to verify your email before you can create a post');
    // }
    this.blogService.create_blog(blog).subscribe({
      next: () => {
        window.alert('Post has been created');
        window.location.reload();
      },
      error: () => {
        window.alert("There's been an error while creating the post");
        window.location.reload();
      }
    })
  }

}
