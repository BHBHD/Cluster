import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BlogService} from "../../services/blog.service";
import { FormGroup, FormControl } from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-admin',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {

  createForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
  });

  public blog: any;
  updateForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private afAuth: AuthService
    ) { }

  async ngOnInit() {
    this.route.paramMap.subscribe(async(paramMap) => {
      const id = paramMap.get('id');
      const uid = paramMap.get('uid');

      if (id) {
        await this.blogService.get_blogs(uid).then(e => {
          for (let i = 0; i < e.blogs.length; i++) {
            if (e.blogs[i].id == id) {
              this.blog = e.blogs[i];
            }
          }
        });
      }
      this.updateForm.setValue({
        title: this.blog.title,
        content: this.blog.content,
      });
    });
  }

  onUpdate() {
    if (this.afAuth.user.uid != this.blog.UID) {
      window.alert('You are not authorized to update this post');
      return window.location.replace('/');
    }

    let blog = {
      bid: (this.blog.id).toString(),
      title: this.updateForm.value.title,
      content: this.updateForm.value.content,
    };
    this.blogService.update_blog(blog).then(() => {
      window.alert('Blog updated!');
      window.location.replace('/');
    }).catch(e => {
      console.log(e);
    });
  }

  onCreate() {
    const blog = {
      title: this.createForm.value.title,
      content: this.createForm.value.content,
      author: this.afAuth.user.displayName,
      uid: this.afAuth.user.uid,
    };
    this.blogService.create_blog(blog).then(() => {
      window.alert('Blog posted!');
      window.location.replace('/');
    });
  }

}
