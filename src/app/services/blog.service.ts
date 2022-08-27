import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BlogService {
  url = environment.endpoint + '/blogs';

  constructor(
    private http: HttpClient
  ) {
  }

  private _blogs: Blog[] = [];

  get blogs() {
    return this._blogs as Blog[];
  }

  get_blog(id: any, uid: any) {
    return this._blogs.find(blog => blog.id == id && blog.uid == uid) as Blog;
  }

  get_blogs_by_uid(uid: any) {
    return this._blogs.filter(blog => blog.uid == uid) as Blog[];
  }

  init() {
    if (this._blogs.length == 0) {
      this.get_blogs().subscribe({
        next: (blogs) => {
          this._blogs = blogs;
        }
      });
    }
  }

  get_blogs(uid?: any): Observable<Blog[]> {
    if (uid) return this.http.get<Blog[]>(this.url + '/get_blogs', {params: {uid: uid}});
    else return this.http.get<Blog[]>(this.url + '/get_blogs');
  }

  update_blog(blog: UpdateBlog): Observable<any> {
    return this.http.post(this.url + '/update_blog', blog);
  }

  create_blog(blog: CreateBlog): Observable<any> {
    return this.http.put(this.url + '/create_blog', blog);
  }

  delete_blog(blog: Blog): Observable<any> {
    return this.http.delete(this.url + '/delete_blog', {params: {id: blog.id}});
  }
}
