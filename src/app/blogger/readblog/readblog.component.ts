import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {BlogService} from "../../services/blog.service";

@Component({
  selector: 'app-readblog',
  templateUrl: './readblog.component.html',
  styleUrls: ['./readblog.component.css']
})
export class ReadblogComponent implements OnInit {

  public blog: any;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
  ) { }

  async ngOnInit() {
    this.route.paramMap.subscribe(async(paramMap) => {
      const id = paramMap.get('id');
      const uid = paramMap.get('uid');
      await this.blogService.get_blogs(uid).then(e => {
        this.blog = e.find((b: any) => b.id == id);
      });
    });
  }
}
