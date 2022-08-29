import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BlogService} from "../../services/blog.service";
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {FileUploader} from "ng2-file-upload";
import {environment} from "../../../environments/environment";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-admin',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({
    url: `${environment.endpoint}/blogs/upload`,
    itemAlias: 'image'
  });

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

  public imgSrc: string = '';

  public blog: Blog | undefined;
  public user: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private blogService: BlogService,
    private afAuth: AuthService,
    private toastr: ToastrService
  ) {
    // this.blogService.init()
    this.user = this.afAuth.user;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(async (paramMap) => {
      const id = paramMap.get('id');
      const uid = paramMap.get('uid');

      if (id && uid) {
        this.blog = this.blogService.get_blog(id, uid);
        if (this.blog) {
          this.imgSrc = this.blog.image ? this.blog.image : '';
          this.updateForm.setValue({
            title: this.blog.title,
            content: this.blog.content,
            image: null
          });
        }
      }
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
  }

  onUpdate() {
    if (!this.blog) return window.location.replace('/');

    if ((this.user.uid != this.blog.uid) && !this.user.is_admin) {
      window.alert('You are not authorized to update this post');
      return window.location.replace('/');
    }

    this.uploader.uploadAll();
    const updatedBlog: UpdateBlog = {
      id: (this.blog.id).toString(),
      title: this.updateForm.value.title,
      content: this.updateForm.value.content,
      image: (this.uploader.queue.length > 0) ? this.uploader.queue[0].file.name : this.createForm.value.image,
    };

    if (this.uploader.queue.length > 0) {
      this.uploader.onCompleteItem = (item: any, status: any) => {
        this.blogService.update_blog(updatedBlog).subscribe({
          next: () => {
            this.toastr.success('Post has been updated with image!')
            window.location.reload();
          },
          error: () => {
            this.toastr.error("There's been an error while updating the post");
            window.location.reload();
          }
        });
      }

    } else {
      this.blogService.update_blog(updatedBlog).subscribe({
        next: () => {
          this.toastr.success('Post has been updated!')
          window.location.reload();
        },
        error: () => {
          this.toastr.error("There's been an error while updating the post");
          window.location.reload();
        }
      });
    }
  }

  onCreate() {
    this.uploader.uploadAll();
    const blog: CreateBlog = {
      title: this.createForm.value.title,
      content: this.createForm.value.content,
      image: (this.uploader.queue.length > 0) ? this.uploader.queue[0].file.name : this.createForm.value.image,
      author: this.afAuth.user.displayName,
      uid: this.afAuth.user.uid,
    };

    if (this.uploader.queue.length > 0) {
      this.uploader.onCompleteItem = (item: any, status: any) => {
        this.blogService.create_blog(blog).subscribe({
          next: () => {
            this.toastr.success('Post has been created with image!');
            window.location.reload();
          },
          error: () => {
            this.toastr.error("There's been an error while creating the post");
            window.location.reload();
          }
        });
      };
    } else {
      this.blogService.create_blog(blog).subscribe({
        next: () => {
          this.toastr.success('Post has been created!');
          window.location.reload();
        },
        error: () => {
          this.toastr.error("There's been an error while creating the post");
          window.location.reload();
        }
      });
    }

    // if (!this.user.has_verified_email) {
    //   return window.alert('You need to verify your email before you can create a post');
    // }

  }

}
