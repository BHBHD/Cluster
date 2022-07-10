import {Component, OnInit} from '@angular/core';
import {BlogService} from "../services/blog.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public blogs: any[] = [];

  constructor(
    private blogService: BlogService,
  ) {
  }

  async ngOnInit() {
    await this.blogService.get_blogs().then((e: any[]) => {
      e.forEach(e => {
        this.blogs.push(e);
      })
    });
  }
}
