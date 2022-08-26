import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {BlogService} from "../../services/blog.service";

@Component({
  selector: 'app-readblog',
  templateUrl: './readblog.component.html',
  styleUrls: ['./readblog.component.css']
})
export class ReadblogComponent implements OnInit {

  public blog: Blog | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private blogService: BlogService,
  ) { }

  async ngOnInit() {
    this.route.paramMap.subscribe(async (paramMap) => {
      const id = paramMap.get('id');
      const uid = paramMap.get('uid');

      if (!id || !uid) {
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
      };
      
      this.blog = this.blogService.get_blog(id, uid);
      if (!this.blog) {
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
      }
    });
  }
}
