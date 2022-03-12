import {Component, OnInit} from '@angular/core';
import {BlogService} from "../services/blog.service";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public blogs: any;

  constructor(
    private blogService: BlogService,
  ) { }

  async ngOnInit() {
    await this.blogService.get_blogs().then(e => {
      this.blogs = e.blogs;
    });
  }

  // const blog = {
  //   title: 'Lorem ipsum dolor sit.',
  //   author: this.afAuth.user.displayName,
  //   content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, molestiaeasperiores! Earum commodi, ' +
  //     'officiis aut repellat obcaecati asperiores utaccusantium corporis voluptatem provident velit, temporibus ' +
  //     'harum, delenitidoloremque aspernatur? Facilis!',
  //   uid: this.uid
  // }
  // this.blogService.create_blog(blog).then(r => {
  //   console.log("Blog Created: ", r)
  // })
}
